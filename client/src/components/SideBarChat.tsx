import React from "react";
import cn from "classnames";
import { setCurrentChat, viewReceivedMessage } from "../store/actionCreators";
import { useAppDispatch } from "../store/hooks";
import { Chat } from "../types/entities";
import { getAvatarUrl } from "../utils/common";

interface SideBarChatProps {
  chat: Chat;
  active: Boolean;
}

const SideBarChat: React.FC<SideBarChatProps> = ({ chat, active }) => {
  const dispatch = useAppDispatch();

  const goToChat = () => {
    dispatch(setCurrentChat(chat));
    dispatch(viewReceivedMessage(chat));
  };

  return (
    <div
      className={cn(
        "max-w-full flex items-center p-2 border-b bg-gray-50 cursor-pointer hover:bg-gray-100",
        {
          "bg-gray-200": active,
        }
      )}
      onClick={goToChat}
    >
      <img
        src={getAvatarUrl(chat!.username)}
        alt=""
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-grow ml-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-gray-800 truncate">{chat.username}</h3>
          <small className="text-xs ml-3 text-gray-500">
            {new Date(Number(chat.createdAt)).toLocaleTimeString()}
          </small>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 truncate whitespace-nowrap overflow-hidden w-32">
            {chat.text ? chat.text : ""}
          </p>
          {chat.unreadMessageCount !== 0 && (
            <div className="bg-green-400 rounded-full px-2">
              {chat.unreadMessageCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBarChat;
