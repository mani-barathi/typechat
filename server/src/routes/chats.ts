import { Router } from "express";
import { getManager } from "typeorm";
import { isAuthenticated } from "../middlewares/auth";
import { Chat } from "../types";
import { mergeChatArrays } from "../utils/chat";

const router = Router();

router.get("/", isAuthenticated, async (req, res) => {
  const { id } = req.user;
  const directChatQuerys: Promise<Chat[]> = getManager().query(
    ` select distinct u.id , u.username as name, max(dm."createdAt") as "createdAt" from users as u 
      inner join direct_messages as dm on (u.id = dm."senderId") or (u.id = dm."receiverId") 
      where dm."senderId" = $1 or dm."receiverId" = $1 
      group by u.id order by max(dm."createdAt") desc
  `,
    [id]
  );
  const groupChatsQuery: Promise<Chat[]> = getManager().query(
    ` 
     select g.name, g.id, gm."isAdmin", max(gmsg."createdAt") as "createdAt" from group_members gm 
     inner join groups g on g.id = gm."groupId" 
     inner join group_messages gmsg on g.id = gmsg."groupId" 
     where gm."memberId" = $1 group by g.id,gm."isAdmin" order by max(gmsg."createdAt") desc
     `,
    [id]
  );
  //  select g.name,g.id, gm."isAdmin", g."createdAt" from group_members gm
  //  inner join groups g on g.id = gm."groupId"
  //  where gm."memberId" = $1 order by g."createdAt" desc
  const [directChats, groupChats] = await Promise.all([
    directChatQuerys,
    groupChatsQuery,
  ]);
  const filteredDirectChats = directChats.filter((c) => c.id !== id);
  filteredDirectChats.forEach((frc) => (frc.isGroupChat = false));
  groupChats.forEach((gc) => (gc.isGroupChat = true));

  const allChats = mergeChatArrays(filteredDirectChats, groupChats);
  return res.json({ ok: true, data: allChats });
});

export default router;
