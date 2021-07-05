import { Router } from "express";
import { Socket } from "socket.io";
import { getManager } from "typeorm";

import DirectMessage from "../entities/DirectMessage";
import { isAuthenticated } from "../middlewares/auth";
import { getPrivateChatRoomIds } from "../utils/chat";

const router = Router();

router.post("/", isAuthenticated, async (req, res) => {
  const { id: senderId } = req.user;
  const { receiverId } = req.body;
  console.log(senderId);
  console.log(receiverId);

  const messages = await getManager().query(
    `
    select dm.*,
    json_build_object(
      'id',s.id,
      'username',s.username
    ) as "sender",
    json_build_object(
      'id',r.id,
      'username',r.username
    ) as "receiver"
    from direct_messages as dm 
    inner join users s on s.id = dm."senderId" 
    inner join users r on r.id = dm."receiverId" 
    where (dm."senderId" = $1 and dm."receiverId" = $2) or ("senderId" = $2 and "receiverId" = $1)
  `,
    [senderId, receiverId]
  );

  res.json({ ok: true, data: messages });
});

router.post("/send", isAuthenticated, async (req, res) => {
  const { id: senderId, username: senderName } = req.user;
  const { receiverName, receiverId, text } = req.body;

  try {
    const { id, createdAt } = await DirectMessage.create({
      senderId,
      text,
      receiverId,
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
    const { receiverRoomId, senderRoomId } = getPrivateChatRoomIds(
      senderName,
      receiverName
    );
    io.to(senderRoomId)
      .to(receiverRoomId)
      .emit("receive-direct-message", payload);
    return res.json({ ok: true });
  } catch (e) {
    console.log("sendDirectMessage Route", e);
    return res.json({ ok: false, error: e.message });
  }
});

export default router;
