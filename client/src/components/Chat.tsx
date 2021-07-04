import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import Splash from "./Splash";
import { useSocket } from "../contexts/SocketContext";
import { useAppSelector } from "../store/hooks";
import { DirectMessage } from "../types/entities";

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
  const { receiver } = useAppSelector((state) => state.currentChat);
  const { socket } = useSocket();
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const chatDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([]);
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
    console.log("connected to direct-message");

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
