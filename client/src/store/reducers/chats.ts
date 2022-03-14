import { ChatsAction } from "../actionTypes";
import {
  NEW_DIRECT_CHAT,
  RECEIVED_MESSAGE,
  REMOVE_CHAT,
  SET_RECENT_CHATS,
  VIEW_RECEIVED_MESSAGE,
} from "../actions";
import { Chat } from "../../types/entities";
import { CurrentChat } from "./currentChat";

export interface ChatsState {
  chats: Chat[];
}

const initialState: ChatsState = {
  chats: [],
};

const reducer = (
  state: ChatsState = initialState,
  action: ChatsAction,
  currentChat: CurrentChat
) => {
  switch (action.type) {
    case NEW_DIRECT_CHAT:
      return { ...state, chats: [action.payload as Chat, ...state.chats] };

    case SET_RECENT_CHATS:
      return {
        ...state,
        chats: [...(action.payload as Chat[])],
      };

    case RECEIVED_MESSAGE: {
      if (Array.isArray(action.payload)) return state;

      const chat = state.chats.find((obj) => {
        if (obj.id === (action.payload as Chat).id) {
          return true;
        }
        return false;
      });

      const filteredChats = state.chats.filter(
        (c) => c.name !== (action.payload as Chat).name
      );

      const isMessageFromCurrentChat =
        currentChat.chat?.id === action.payload.id;

      const newChat: Chat = {
        id: action.payload.id,
        name: action.payload.name,
        createdAt: action.payload.createdAt,
        text: action.payload.text,
        unreadMessageCount: isMessageFromCurrentChat ? 0 : 1,
      };

      if (chat && !isMessageFromCurrentChat) {
        newChat.unreadMessageCount = chat.unreadMessageCount! + 1;
      }

      return { chats: [newChat, ...filteredChats] };
    }

    case VIEW_RECEIVED_MESSAGE: {
      const updatedChats = state.chats.map((chat) => {
        if (chat.id === (action.payload as Chat).id) {
          return {
            ...chat,
            unreadMessageCount: 0,
          };
        }
        return chat;
      });
      return {
        chats: updatedChats,
      };
    }

    case REMOVE_CHAT: {
      const updatedChats = state.chats.filter(
        (chat) => chat.id !== (action.payload as Chat).id
      );

      return {
        chats: updatedChats,
      };
    }
    default:
      return state;
  }
};

export default reducer;
