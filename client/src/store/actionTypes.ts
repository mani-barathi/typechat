import { Chat } from "../types/entities";

export type ChatsAction = {
  type: string;
  payload: Chat | Chat[];
};

export type CurrentChatAction = {
  type: string;
  payload: Chat;
};
