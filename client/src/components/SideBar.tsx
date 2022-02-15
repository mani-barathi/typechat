import React, { useEffect, useState } from "react";
import SideBarHeader from "./SideBarHeader";
import SideBarChat from "./SideBarChat";
import Modal from "./Modal";
import NewChatForm from "./NewChatForm";
import NewGroupForm from "./NewGroupForm";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import axios from "../axios";
import { ResponseData } from "../types";
import { addReceivedMessage, setRecentChats } from "../store/actionCreators";
import { useSocket } from "../contexts/SocketContext";
import { useAuth } from "../contexts/AuthContext";
import { Chat, DirectMessage } from "../types/entities";

interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = () => {
  const dispatch = useAppDispatch();
  const { notificationSocket } = useSocket();
  const { user } = useAuth();
  const { chats } = useAppSelector((store) => store.chats);
  const { receiver } = useAppSelector((store) => store.currentChat);
  const [groupChatModal, setGroupModalChat] = useState(false);
  const [chatModal, setChatModal] = useState(false);

  useEffect(() => {
    if (!notificationSocket || !user) return;

    const notificationReceiver = (data: DirectMessage) => {
      const whoMessaged = data.sender!.username;
      // I'm the sender
      if (whoMessaged === user.username) {
        dispatch(
          addReceivedMessage({
            id: data.receiverId,
            username: data.receiver!.username,
            createdAt: data.createdAt,
            text: data.text,
          })
        );
      } else {
        // I'm the receiver sender
        dispatch(
          addReceivedMessage({
            id: data.senderId,
            username: data.sender!.username,
            createdAt: data.createdAt,
            text: data.text,
          })
        );
      }
    };

    notificationSocket.emit("join-notification", { username: user.username });
    notificationSocket.on("receive-notification", notificationReceiver);

    return () => {
      notificationSocket.off("receive-notifications", notificationReceiver);
      notificationSocket?.emit("leave-notification", {
        username: user.username,
      });
    };
  }, [notificationSocket, user, dispatch]);

  useEffect(() => {
    (async () => {
      try {
        const { data: resData } = await axios.get<ResponseData>("/api/chats/");
        const { ok, data } = resData;
        (data as Chat[]).forEach((d) => (d.unreadMessageCount = 0));
        if (ok) dispatch(setRecentChats(data));
      } catch (e) {
        console.log("sidebar", e);
      }
    })();
  }, [dispatch]);

  return (
    <div className="flex flex-col w-2/6 h-full border-r border-gray-200">
      <SideBarHeader
        openChatModal={() => setChatModal(true)}
        openGroupModal={() => setGroupModalChat(true)}
      />

      <div className="sidebar__chats pb-5 flex-grow overflow-x-hidden overflow-y-auto">
        {chats.map((chat) => (
          <SideBarChat
            key={chat.username}
            chat={chat}
            active={chat.username === receiver?.username}
          />
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
