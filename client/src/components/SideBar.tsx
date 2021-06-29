import React from "react";
import SideBarHeader from "./SideBarHeader";

interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = () => {
  return (
    <div className="w-2/6 h-full border-r border-gray-200">
      <SideBarHeader />
    </div>
  );
};

export default SideBar;
