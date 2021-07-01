import { Router } from "express";
import DirectMessage from "../entities/DirectMessage";
import { isAuthenticated } from "../middlewares/auth";

const router = Router();

router.post("/send", isAuthenticated, async (req, res) => {
  const { id: senderId } = req.user;
  const { receiverId, text } = req.body;

  try {
    const newMessage = await DirectMessage.create({
      senderId,
      text,
      receiverId,
    }).save();
    // publish message via socket.io
    return res.json({ ok: true, data: newMessage });
  } catch (e) {
    console.log("sendDirectMessage Route", e);
    return res.json({ ok: false, error: e.message });
  }
});

export default router;
