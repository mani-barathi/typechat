import { User } from "../types/entities";

export type ChatsAction = {
  type: string;
  payload: User;
};

export type CurrentChatAction = {
  type: string;
  payload: User;
};
