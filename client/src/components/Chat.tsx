import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import Splash from "./Splash";
import { useSocket } from "../contexts/SocketContext";
import { useAppSelector } from "../store/hooks";
import { DirectMessage } from "../types/entities";
import axios from "../axios";
import { ResponseData } from "../types";

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
  const { receiver } = useAppSelector((state) => state.currentChat);
  const { socket } = useSocket();
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const chatDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!receiver) return;

    (async () => {
      const payload = { receiverId: receiver!.id };
      const { data: resData } = await axios.post<ResponseData>(
        "/api/direct-message/",
        payload
      );
      const { data, ok } = resData;
      console.log(resData);
      if (ok) {
        setMessages(data);
        const scrollTop =
          chatDivRef.current!.scrollHeight - chatDivRef.current!.clientHeight;
        chatDivRef.current?.scrollTo({ top: scrollTop, behavior: "smooth" });
      }
    })();
  }, [receiver]);

  useEffect(() => {
    if (!receiver || !socket) return;
    const messageReceiver = (message: DirectMessage) => {
      setMessages((p) => [...p, message]);
      const scrollTop =
        chatDivRef.current!.scrollHeight - chatDivRef.current!.clientHeight;
      chatDivRef.current?.scrollTo({ top: scrollTop, behavior: "smooth" });
    };

    socket.emit("join-direct-message", { receiverName: receiver.username });
    socket.on("receive-direct-message", messageReceiver);

    return () => {
      socket.off("receive-direct-message", messageReceiver);
      socket?.emit("leave-direct-message", { receiverName: receiver.username });
    };
  }, [socket, receiver]);

  if (!receiver) {
    return (
      <div className="flex-grow overflow-x-hidden overflow-y-auto">
        <Splash isfullScreen={false} spinner={false} text={splashText} />
      </div>
    );
  }

  return (
    <div
      className="flex-grow overflow-x-hidden overflow-y-auto"
      ref={chatDivRef}
    >
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
    </div>
  );
};

const splashText =
  "Start a chat either by creating a new one or by selecting a previous from the sidebar";

export default Chat;
