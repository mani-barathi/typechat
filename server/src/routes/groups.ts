import { Router } from "express";
import { Socket } from "socket.io";
import { getManager } from "typeorm";
import Group from "../entities/Group";
import GroupMember from "../entities/GroupMember";
import GroupMessage from "../entities/GroupMessage";
import User from "../entities/User";
import { isAuthenticated } from "../middlewares/auth";

const router = Router();

router.post("/create", isAuthenticated, async (req, res) => {
  const { id } = req.user;
  const { name } = req.body;
  try {
    const newGroup = await getManager().transaction(async (tm) => {
      const group = await tm.save<Group>(
        Group.create({ name, creatorId: id, createdAt: new Date().getTime() })
      );
      await tm.save<GroupMember>(
        GroupMember.create({ groupId: group.id, memberId: id, isAdmin: true })
      );

      return {
        name: group.name,
        id: group.id,
        isAdmin: true,
        createdAt: group.createdAt,
      };
    });
    return res.json({ ok: true, data: newGroup });
  } catch (e) {
    return res.json({ ok: false, error: e.message });
  }
});

router.post("/send", isAuthenticated, async (req, res) => {
  const { id: senderId, username: senderName } = req.user;
  const { groupId, text } = req.body;

  try {
    const { id, createdAt } = await GroupMessage.create({
      senderId,
      text,
      groupId,
      createdAt: new Date().getTime(),
    }).save();
    const payload = {
      id,
      groupId,
      text,
      senderId,
      senderName,
      createdAt,
    };
    const io: Socket = req.app.get("io");
    io.to(`${groupId}`).emit("receive-group-message", payload);
    return res.json({ ok: true });
  } catch (e) {
    return res.json({ ok: false, error: e.message });
  }
});

router.post("/messages", isAuthenticated, async (req, res) => {
  const { timestamp, groupId, id } = req.body;
  const limit = 15;
  const take = limit + 1;
  const replacements: any[] = [groupId, take];
  let createdAt;
  if (timestamp && id) {
    createdAt = true;
    replacements.push(parseInt(timestamp), id);
  }

  const messages = await getManager().query(
    `
    select gm.*, u.username as "senderName" from group_messages as gm inner join "users" u on u.id = gm."senderId"
    where gm."groupId" = $1 ${
      createdAt ? `and ((gm."createdAt", gm.id) < ($3, $4)) ` : ""
    }
    order by gm."createdAt" desc, gm.id desc limit $2 `,
    replacements
  );

  const data = {
    results: messages.slice(0, limit),
    hasMore: messages.length === take,
  };
  res.json({ ok: true, data });
});

router.post("/add", isAuthenticated, async (req, res) => {
  const { groupId, name } = req.body;

  const user = await User.findOne({ username: name });
  console.log(user);
  if (!user) {
    return res.json({ ok: false, error: "No user found!" });
  }

  await GroupMember.create({
    memberId: user.id,
    isAdmin: false,
    groupId,
  }).save();

  return res.json({ ok: true });
});

export default router;

router.post("/leave", isAuthenticated, async (req, res) => {
  const { id } = req.user;
  const { groupId } = req.body;
  try {
    await getManager().query(
      'delete from group_members where "memberId" = $1 and "groupId" = $2',
      [id, groupId]
    );
    return res.json({ ok: true });
  } catch (e) {
    return res.json({ ok: false, error: e.message });
  }
});
