import { User } from "../types/entities";
import { NEW_DIRECT_CHAT, SET_CURRENT_CHAT } from "./actions";

export const newDirectChat = (payload: User) => ({
  type: NEW_DIRECT_CHAT,
  payload,
});

export const setCurrentChat = (payload: User) => ({
  type: SET_CURRENT_CHAT,
  payload,
});
