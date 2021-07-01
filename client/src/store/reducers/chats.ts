import { ChatsAction } from "../actionTypes";
import { NEW_DIRECT_CHAT } from "../actions";
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
      return { ...state, chats: [action.payload, ...state.chats] };

    default:
      return state;
  }
};

export default reducer;
