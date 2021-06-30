import React from "react";
import { User } from "../types/entities";

interface SideBarChatProps {
  user: Pick<User, "username" | "id">;
}

const SideBarChat: React.FC<SideBarChatProps> = ({ user }) => {
  return (
    <div className="max-w-full flex items-center p-2 border-b bg-gray-50 cursor-pointer hover:bg-gray-100">
      <img
        src={`https://ui-avatars.com/api/?name=${user?.username}&background=D5F5E3`}
        alt=""
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-grow ml-2">
        <div className="flex items-center">
          <h3 className="text-gray-800 truncate font-semibold">
            {user.username}
          </h3>
          <span className="text-xs ml-3 text-gray-500">10.40am</span>
        </div>
        <p className="w-full text-sm text-gray-500 truncate font-semibold">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ducimus
          eveniet sequi dolores dolorum fugiat maxime voluptas rerum quidem eos!
        </p>
      </div>
    </div>
  );
};

export default SideBarChat;
