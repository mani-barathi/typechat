import React, { useState, useEffect } from "react";
import { useSocket } from "../contexts/SocketContext";
import { useAppSelector } from "../store/hooks";
import { DirectMessage } from "../types/entities";
import ChatMessage from "./ChatMessage";

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
  const { receiver } = useAppSelector((state) => state.currentChat);
  const { socket } = useSocket();
  const [messages, setMessages] = useState<DirectMessage[]>([]);

  useEffect(() => {
    setMessages([]);
  }, [receiver]);

  useEffect(() => {
    if (!receiver || !socket) return;
    const messageReceiver = (message: DirectMessage) => {
      setMessages((p) => [...p, message]);
    };

    socket.emit("join-direct-message", { receiverName: receiver.username });
    socket.on("receive-direct-message", messageReceiver);
    console.log("connected to direct-message");

    return () => {
      socket.off("receive-direct-message", messageReceiver);
      socket?.emit("leave-direct-message", { receiverName: receiver.username });
    };
  }, [socket, receiver]);

  return (
    <div className="p-2 flex-grow overflow-x-hidden overflow-y-auto">
      <h1 className="text-2xl">Chat section</h1>
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
    </div>
  );
};

export default Chat;
