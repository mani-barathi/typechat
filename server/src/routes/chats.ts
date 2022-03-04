import { Router } from "express";
import { getManager } from "typeorm";
import { isAuthenticated } from "../middlewares/auth";
import { Chat } from "../types";

const router = Router();

router.get("/", isAuthenticated, async (req, res) => {
  const { id } = req.user;
  const recentChats: Chat[] = await getManager().query(
    `
  select distinct u.id , u.username as name, max(dm."createdAt") as "createdAt" from users as u 
  inner join direct_messages as dm on (u.id = dm."senderId") or (u.id = dm."receiverId") 
  where dm."senderId" = $1 or dm."receiverId" = $1 
  group by u.id order by max(dm."createdAt") desc
  `,
    [id]
  );
  const filteredRecentChats = recentChats.filter((c) => c.id !== id);
  filteredRecentChats.forEach((frc) => (frc.isGroupChat = false));
  return res.json({ ok: true, data: filteredRecentChats });
});

export default router;
