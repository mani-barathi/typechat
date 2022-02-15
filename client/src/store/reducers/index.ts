import newChatReducer from "./chats";
import currentChatReducer from "./currentChat";

const allReducers = (state: any = {}, action: any) => {
  return {
    chats: newChatReducer(state.chats, action, state.currentChat),
    currentChat: currentChatReducer(state.currentChat, action),
  };
};

export default allReducers;
