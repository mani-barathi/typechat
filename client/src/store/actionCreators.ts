import { User } from "../types/entities";
import { NEW_DIRECT_CHAT, SET_CURRENT_CHAT, SET_RECENT_CHATS } from "./actions";

export const newDirectChat = (payload: User) => ({
  type: NEW_DIRECT_CHAT,
  payload,
});

export const setCurrentChat = (payload: User) => ({
  type: SET_CURRENT_CHAT,
  payload,
});

export const setRecentChats = (payload: User) => ({
  type: SET_RECENT_CHATS,
  payload,
});
