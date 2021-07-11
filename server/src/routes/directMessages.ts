import { Router } from "express";
import { Socket } from "socket.io";
import { getManager } from "typeorm";

import DirectMessage from "../entities/DirectMessage";
import { isAuthenticated } from "../middlewares/auth";
import { getPrivateChatRoomIds } from "../utils/chat";

const router = Router();

router.post("/", isAuthenticated, async (req, res) => {
  const { id: senderId } = req.user;
  const { receiverId, timestamp, id } = req.body;
  const limit = 15;
  const take = limit + 1;
  const replacements: any[] = [senderId, receiverId, take];
  let createdAt;
  if (timestamp && id) {
    createdAt = true;
    replacements.push(parseInt(timestamp), id);
  }

  const messages = await getManager().query(
    `
    select dm.* from direct_messages as dm where 
    ((dm."senderId" = $1 and dm."receiverId" = $2) or (dm."senderId" = $2 and dm."receiverId" = $1))
    ${createdAt ? `and ((dm."createdAt", dm.id) < ($4, $5)) ` : ""}
    order by dm."createdAt" desc, dm.id desc limit $3 `,
    replacements
  );

  const data = {
    results: messages.slice(0, limit),
    hasMore: messages.length === take,
  };
  res.json({ ok: true, data });
});

router.post("/send", isAuthenticated, async (req, res) => {
  const { id: senderId, username: senderName } = req.user;
  const { receiverName, receiverId, text } = req.body;

  try {
    const { id, createdAt } = await DirectMessage.create({
      senderId,
      text,
      receiverId,
      createdAt: new Date().getTime(),
    }).save();
    const payload = {
      id,
      createdAt,
      text,
      senderId,
      receiverId,
      receiver: { id: receiverId, username: receiverName },
      sender: { id: senderId, username: senderName },
    };
    const io: Socket = req.app.get("io");
    const notificationIo: Socket = req.app.get("notificationIo");
    const { receiverRoomId, senderRoomId } = getPrivateChatRoomIds(
      senderName,
      receiverName
    );
    io.to(senderRoomId)
      .to(receiverRoomId)
      .emit("receive-direct-message", payload);
    notificationIo
      .to(senderName)
      .to(receiverName)
      .emit("receive-notification", payload);
    return res.json({ ok: true });
  } catch (e) {
    console.log("sendDirectMessage Route", e);
    return res.json({ ok: false, error: e.message });
  }
});

export default router;
