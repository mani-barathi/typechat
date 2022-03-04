import React from "react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import { useAppSelector } from "../store/hooks";
import { getAvatarUrl } from "../utils/common";

interface ChatHeaderProps {}

const ChatHeader: React.FC<ChatHeaderProps> = () => {
  const { chat } = useAppSelector((store) => store.currentChat);

  if (!chat) return null;

  return (
    <div className="flex items-center p-3 border-b xl:rounded-tr bg-green-400">
      <img
        src={getAvatarUrl(chat.name)}
        alt=""
        className="w-10 h-10 rounded-full object-cover"
      />
      <h2 className="text-xl flex-grow ml-3 truncate">{chat.name}</h2>

      <button
        className="px-2 rounded-full text-white transition duration-150 transform hover:scale-90"
        title="Options"
      >
        <DotsVerticalIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default ChatHeader;
