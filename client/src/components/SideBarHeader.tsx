import React from "react";
import { useHistory } from "react-router-dom";
import { PlusIcon, LogoutIcon } from "@heroicons/react/outline";

import axios from "../axios";
import { useAuth } from "../contexts/AuthContext";
import { setAccessToken } from "../utils/token";

interface SideBarHeaderProps {}

const SideBarHeader: React.FC<SideBarHeaderProps> = () => {
  const { user, setUser } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    setUser(null);
    setAccessToken("");
    history.push("/login");
  };
  return (
    <div className="flex items-center justify-between p-3 border-b bg-green-400 xl:rounded-tl">
      <img
        src={`https://ui-avatars.com/api/?name=${user?.username}&background=D5F5E3`}
        alt=""
        className="w-10 h-10 rounded-full object-cover"
      />

      <div className="flex items-center">
        <button
          className="px-2 text-white rounded-full transition duration-150 transform hover:scale-95"
          title="New Chat"
        >
          <PlusIcon className="h-7 w-7" />
        </button>
        <button
          className="px-2 text-white rounded-full transition duration-150 transform hover:translate-x-0.5"
          onClick={handleLogout}
          title="logout"
        >
          <LogoutIcon className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
};

export default SideBarHeader;
