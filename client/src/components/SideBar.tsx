import React from "react";
import SideBarHeader from "./SideBarHeader";
import SideBarChat from "./SideBarChat";

interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = () => {
  return (
    <div className="flex flex-col w-2/6 h-full border-r border-gray-200">
      <SideBarHeader />
      <div className="sidebar__chats pb-5 flex-grow overflow-x-hidden overflow-y-auto">
        <SideBarChat user={{ username: "Person 1", id: 2 }} />
        <SideBarChat user={{ username: "Person 2", id: 2 }} />
        <SideBarChat user={{ username: "Person 3", id: 2 }} />
        <SideBarChat user={{ username: "Person 4", id: 2 }} />
        <SideBarChat user={{ username: "Person 5", id: 2 }} />
        <SideBarChat user={{ username: "Person 6", id: 2 }} />
        <SideBarChat user={{ username: "Person 7", id: 2 }} />
        <SideBarChat user={{ username: "Person 8", id: 2 }} />
        <SideBarChat user={{ username: "Person 9", id: 2 }} />
        <SideBarChat user={{ username: "Group xy", id: 2 }} />
        <SideBarChat user={{ username: "Group ab", id: 2 }} />
      </div>
    </div>
  );
};

export default SideBar;
