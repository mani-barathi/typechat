import React from "react";
import { DotsVerticalIcon } from "@heroicons/react/outline";

interface ChatHeaderProps {}

const ChatHeader: React.FC<ChatHeaderProps> = () => {
  return (
    <div className="flex items-center p-3 border-b xl:rounded-tr bg-green-400">
      <img
        src={`https://ui-avatars.com/api/?name=${"asdf"}&background=D5F5E3`}
        alt=""
        className="w-10 h-10 rounded-full object-cover"
      />
      <h2 className="text-xl flex-grow ml-3">ChatRoom or Receiver Name</h2>

      <button
        className="px-2 rounded-full transition duration-150 transform hover:scale-90"
        title="Options"
      >
        <DotsVerticalIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default ChatHeader;
