import { Router } from "express";
import { getManager } from "typeorm";
import Group from "../entities/Group";
import GroupMember from "../entities/GroupMember";
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

export default router;
