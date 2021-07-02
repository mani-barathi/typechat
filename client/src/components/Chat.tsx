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
    socket.emit("direct-message", { receiverName: receiver.username });
    console.log("connected to direct-message");
    socket.on("receive-direct-message", (message: DirectMessage) => {
      setMessages((p) => [...p, message]);
    });

    return () => {
      socket?.off("receive-direct-message");
    };
  }, [socket, receiver]);

  return (
    <div className="p-2 flex-grow overflow-x-hidden overflow-y-auto">
      <h1 className="text-2xl">Chat section</h1>
      {messages.map((msg) => (
        <ChatMessage message={msg} />
      ))}
    </div>
  );
};

export default Chat;
