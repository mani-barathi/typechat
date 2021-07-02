import { Router } from "express";
import { Socket } from "socket.io";
import DirectMessage from "../entities/DirectMessage";
import { isAuthenticated } from "../middlewares/auth";
import { getPrivateChatRoomIds } from "../utils/chat";

const router = Router();

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
