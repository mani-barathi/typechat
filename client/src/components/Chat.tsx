import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import Splash from "./Splash";
import { useSocket } from "../contexts/SocketContext";
import { useAppSelector } from "../store/hooks";
import { DirectMessage } from "../types/entities";
import axios from "../axios";
import { ResponseData } from "../types";
import { useAuth } from "../contexts/AuthContext";

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
  const { receiver } = useAppSelector((state) => state.currentChat);
  const { user } = useAuth();
  const { socket } = useSocket();
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const chatDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!receiver) return;
    const emptyArr: DirectMessage[] = [];
    setMessages(emptyArr);
    (async () => {
      const payload = { receiverId: receiver.id };
      const { data: resData } = await axios.post<ResponseData>(
        "/api/direct-message/",
        payload
      );
      const { data, ok } = resData;
      if (ok) {
        data.results.reverse();
        setMessages(data.results);
        setHasMore(data.hasMore);
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

  const handleLoadMore = async () => {
    if (!hasMore) return;

    const payload = {
      receiverId: receiver!.id,
      timestamp: messages[0].createdAt,
      id: messages[0].id,
    };
    const { data: resData } = await axios.post<ResponseData>(
      "/api/direct-message/",
      payload
    );
    const { data, ok } = resData;
    if (ok) {
      console.log(data);
      data.results.reverse();
      setMessages((p) => [...data.results, ...p]);
      setHasMore(data.hasMore);
    }
  };

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
      {hasMore && (
        <button
          className="py-1 px-3 rounded m-1 border-2 border-gray-300 uppercase text-sm hover:bg-gray-300"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      )}

      {messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          message={{
            ...msg,
            sender: msg.senderId === user!.id ? user! : receiver,
            receiver: msg.senderId === user!.id ? receiver! : user!,
          }}
        />
      ))}
    </div>
  );
};

const splashText =
  "Start a chat either by creating a new one or by selecting a previous from the sidebar";

export default Chat;
