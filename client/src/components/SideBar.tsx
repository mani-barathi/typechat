import React, { useState } from "react";
import SideBarHeader from "./SideBarHeader";
import SideBarChat from "./SideBarChat";
import Modal from "./Modal";
import NewChatForm from "./NewChatForm";
import NewGroupForm from "./NewGroupForm";

import { useAppSelector } from "../store/hooks";

interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = () => {
  const { chats } = useAppSelector((store) => store.chats);
  const [groupChatModal, setGroupModalChat] = useState(false);
  const [chatModal, setChatModal] = useState(false);

  return (
    <div className="flex flex-col w-2/6 h-full border-r border-gray-200">
      <SideBarHeader
        openChatModal={() => setChatModal(true)}
        openGroupModal={() => setGroupModalChat(true)}
      />

      <div className="sidebar__chats pb-5 flex-grow overflow-x-hidden overflow-y-auto">
        {chats.map((chat) => (
          <SideBarChat key={chat.username} user={chat} />
        ))}
      </div>

      <Modal
        title="New Group"
        open={groupChatModal}
        closeFn={() => setGroupModalChat(false)}
      >
        <NewGroupForm closeFn={() => setGroupModalChat(false)} />
      </Modal>

      <Modal
        title="New Chat"
        open={chatModal}
        closeFn={() => setChatModal(false)}
      >
        <NewChatForm closeFn={() => setChatModal(false)} />
      </Modal>
    </div>
  );
};

export default SideBar;
