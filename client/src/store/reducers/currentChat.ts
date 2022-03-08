import { CurrentChatAction } from "../actionTypes";
import { SET_CURRENT_CHAT } from "../actions";
import { Chat } from "../../types/entities";

export interface CurrentChat {
  chat: Chat | null;
}

const initialState: CurrentChat = {
  chat: null,
};

const reducer = (
  state: CurrentChat = initialState,
  action: CurrentChatAction
) => {
  switch (action.type) {
    case SET_CURRENT_CHAT:
      return { ...state, chat: action.payload };

    default:
      return state;
  }
};

export default reducer;
