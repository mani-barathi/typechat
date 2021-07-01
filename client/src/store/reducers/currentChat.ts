import { CurrentChatAction } from "../actionTypes";
import { SET_CURRENT_CHAT } from "../actions";
import { User } from "../../types/entities";

interface CurrentChat {
  receiver: User | null;
  isGroupChat: Boolean;
}

const initialState: CurrentChat = {
  receiver: null,
  isGroupChat: false,
};

const reducer = (
  state: CurrentChat = initialState,
  action: CurrentChatAction
) => {
  switch (action.type) {
    case SET_CURRENT_CHAT:
      return { ...state, receiver: action.payload };

    default:
      return state;
  }
};

export default reducer;
