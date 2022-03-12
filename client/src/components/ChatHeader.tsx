import { LogoutIcon, PlusIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { useAppSelector } from "../store/hooks";
import { getAvatarUrl } from "../utils/common";
import LeaveGroup from "./LeaveGroup";
import Modal from "./Modal";
import NewGroupMemberForm from "./NewGroupMemberForm";

interface ChatHeaderProps {}

const ChatHeader: React.FC<ChatHeaderProps> = () => {
  const { chat } = useAppSelector((store) => store.currentChat);
  const [addParticipantModal, setAddParticipantModal] = useState(false);
  const [leaveGroupModal, setLeaveGroupModal] = useState(false);

  if (!chat) return null;

  return (
    <div className="flex items-center p-3 border-b xl:rounded-tr bg-green-400">
      <img
        src={getAvatarUrl(chat.name)}
        alt=""
        className="w-10 h-10 rounded-full object-cover"
      />
      <h2 className="text-xl flex-grow ml-3 truncate">{chat.name}</h2>

      {chat.isGroupChat && chat.isAdmin && (
        <button
          className="px-2 rounded-full text-white transition duration-150 transform hover:scale-90"
          title="Add Participant"
          onClick={() => setAddParticipantModal(true)}
        >
          <PlusIcon className="h-7 -w-7" />
        </button>
      )}
      {chat.isGroupChat && (
        <button
          className="px-2 rounded-full text-white transition duration-150 transform hover:scale-90"
          title="Leave Group"
          onClick={() => setLeaveGroupModal(true)}
        >
          <LogoutIcon className="h-7 -w-7" />
        </button>
      )}

      <Modal
        title="Add Participant"
        open={addParticipantModal}
        closeFn={() => setAddParticipantModal(false)}
      >
        <NewGroupMemberForm closeFn={() => setAddParticipantModal(false)} />
      </Modal>
      <Modal
        title="Exit Group"
        open={leaveGroupModal}
        closeFn={() => setLeaveGroupModal(false)}
      >
        <LeaveGroup closeFn={() => setLeaveGroupModal(false)} />
      </Modal>
    </div>
  );
};

export default ChatHeader;
