import { ChatsAction } from "../actionTypes";
import { NEW_DIRECT_CHAT, SET_RECENT_CHATS } from "../actions";
import { User } from "../../types/entities";

export interface ChatsState {
  chats: User[];
}

const initialState: ChatsState = {
  chats: [],
};

const reducer = (state: ChatsState = initialState, action: ChatsAction) => {
  switch (action.type) {
    case NEW_DIRECT_CHAT:
      return { ...state, chats: [action.payload as User, ...state.chats] };

    case SET_RECENT_CHATS:
      return {
        ...state,
        chats: [...state.chats, ...(action.payload as User[])],
      };

    default:
      return state;
  }
};

export default reducer;
