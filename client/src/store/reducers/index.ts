import { combineReducers } from "redux";
import newChatReducer from "./chats";

const reducers = combineReducers({
  newChat: newChatReducer,
});

export default reducers;
