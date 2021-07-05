import React from "react";
import { DirectMessage } from "../types/entities";
import { formatTime, getAvatarUrl } from "../utils/common";

interface ChatMessageProps {
  message: DirectMessage;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { sender, text, createdAt } = message;
  return (
    <div className="mb-2 p-1 px-2 hover:bg-gray-200 transition duration-75">
      <div className="flex items-center">
        <img
          src={getAvatarUrl(sender!.username)}
          alt=""
          className="w-7 h-7 mr-2 rounded-full object-cover"
        />
        <p className="font-semibold flex-grow">{sender!.username}</p>
        <span className="ml-4 mr-2 text-gray-500 text-xs">
          {formatTime(createdAt)}
        </span>
      </div>
      <p>{text}</p>
    </div>
  );
};

export default ChatMessage;
