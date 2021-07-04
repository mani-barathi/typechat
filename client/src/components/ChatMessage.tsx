import React from "react";
import { DirectMessage } from "../types/entities";
import { getAvatarUrl } from "../utils/common";

interface ChatMessageProps {
  message: DirectMessage;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { sender, text } = message;
  return (
    <div className="mb-2 p-1 px-2 hover:bg-gray-200 transition duration-75">
      <div className="flex">
        <img
          src={getAvatarUrl(sender!.username)}
          alt=""
          className="w-7 h-7 mr-2 rounded-full object-cover"
        />
        <p className="font-semibold">{sender!.username}</p>
      </div>
      <p>{text}</p>
    </div>
  );
};

export default ChatMessage;
