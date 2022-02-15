import { ChatsAction } from "../actionTypes";
import {
  NEW_DIRECT_CHAT,
  RECEIVED_MESSAGE,
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
        (c) => c.username !== (action.payload as Chat).username
      );

      const isMessageFromCurrentChat =
        currentChat.receiver?.id === action.payload.id;

      const newChat: Chat = {
        id: action.payload.id,
        username: action.payload.username,
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

    default:
      return state;
  }
};

export default reducer;
