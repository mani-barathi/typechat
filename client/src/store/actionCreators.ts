import { User } from "../types/entities";
import { NEW_DIRECT_CHAT } from "./actions";

export const newDirectChat = (payload: User) => ({
  type: NEW_DIRECT_CHAT,
  payload,
});
