import { User } from "../types/entities";

export type ChatsAction = {
  type: string;
  payload: User;
};
