import { ChatsAction } from "../actionTypes";
import {
  NEW_DIRECT_CHAT,
  RECEIVED_MESSAGE,
  SET_RECENT_CHATS,
} from "../actions";
import { Chat } from "../../types/entities";

export interface ChatsState {
  chats: Chat[];
}

const initialState: ChatsState = {
  chats: [],
};

const reducer = (state: ChatsState = initialState, action: ChatsAction) => {
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

      const filteredChats = state.chats.filter(
        (c) => c.username !== (action.payload as Chat).username
      );
      const newChat: Chat = {
        id: action.payload.id,
        username: action.payload.username,
        createdAt: action.payload.createdAt,
        text: action.payload.text,
      };
      return { chats: [newChat, ...filteredChats] };
    }

    default:
      return state;
  }
};

export default reducer;
