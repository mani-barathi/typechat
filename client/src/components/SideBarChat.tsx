import React from "react";
import cn from "classnames";
import { setCurrentChat } from "../store/actionCreators";
import { useAppDispatch } from "../store/hooks";
import { User } from "../types/entities";
import { getAvatarUrl } from "../utils/common";

interface SideBarChatProps {
  user: User;
  active: Boolean;
}

const SideBarChat: React.FC<SideBarChatProps> = ({ user, active }) => {
  const dispatch = useAppDispatch();

  const goToChat = () => {
    dispatch(setCurrentChat(user));
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
        src={getAvatarUrl(user!.username)}
        alt=""
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-grow ml-2">
        <div className="flex items-center">
          <h3 className="text-lg text-gray-800 truncate">{user.username}</h3>
          <span className="text-xs ml-3 text-gray-500">10.40am</span>
        </div>
        <p className="w-full text-sm text-gray-500 truncate">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ducimus
          eveniet sequi dolores dolorum fugiat maxime voluptas rerum quidem eos!
        </p>
      </div>
    </div>
  );
};

export default SideBarChat;
