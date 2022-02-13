import { Chat } from "../types/entities";
import {
  NEW_DIRECT_CHAT,
  RECEIVED_MESSAGE,
  RECEIVED_SENT_MESSAGE,
  SET_CURRENT_CHAT,
  SET_RECENT_CHATS,
} from "./actions";

export const newDirectChat = (payload: Chat) => ({
  type: NEW_DIRECT_CHAT,
  payload,
});

export const setCurrentChat = (payload: Chat) => ({
  type: SET_CURRENT_CHAT,
  payload,
});

export const setRecentChats = (payload: Chat[]) => ({
  type: SET_RECENT_CHATS,
  payload,
});

export const addReceivedMessage = (payload: Chat) => ({
  type: RECEIVED_MESSAGE,
  payload,
});

export const addReceivedSentMessage = (payload: Chat) => ({
  type: RECEIVED_SENT_MESSAGE,
  payload,
});
