import { combineReducers } from "redux";
import newChatReducer from "./chats";
import currentChatReducer from "./currentChat";

const reducers = combineReducers({
  chats: newChatReducer,
  currentChat: currentChatReducer,
});

export default reducers;
