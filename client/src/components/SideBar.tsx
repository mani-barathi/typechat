import React, { useState } from "react";
import SideBarHeader from "./SideBarHeader";
import SideBarChat from "./SideBarChat";
import Modal from "./Modal";
import NewChatForm from "./NewChatForm";
import NewGroupForm from "./NewGroupForm";

interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = () => {
  const [groupChatModal, setGroupModalChat] = useState(false);
  const [chatModal, setChatModal] = useState(false);

  return (
    <div className="flex flex-col w-2/6 h-full border-r border-gray-200">
      <SideBarHeader
        openChatModal={() => setChatModal(true)}
        openGroupModal={() => setGroupModalChat(true)}
      />

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
