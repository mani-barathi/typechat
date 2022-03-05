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
  const { chat } = useAppSelector((state) => state.currentChat);
  const { user } = useAuth();
  const { socket } = useSocket();
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const chatDivRef = useRef<HTMLDivElement>(null);
  const prevScrollHeightRef = useRef<any>({ scrollTop: 0, scrollHeight: 0 });

  useEffect(() => {
    if (!chat) return;
    const emptyArr: DirectMessage[] = [];
    setMessages(emptyArr);
    (async () => {
      const payload = { groupId: chat.id, receiverId: chat.id };
      const messagesUrl = chat.isGroupChat
        ? "/api/group/messages"
        : "/api/direct-message";
      const { data: resData } = await axios.post<ResponseData>(
        messagesUrl,
        payload
      );
      const { data, ok } = resData;
      if (ok) {
        data.results.reverse();
        setMessages(data.results);
        setHasMore(data.hasMore);
        const scrollTop =
          chatDivRef.current!.scrollHeight - chatDivRef.current!.clientHeight;
        chatDivRef.current?.scrollTo({ top: scrollTop });
      }
    })();
  }, [chat]);

  useEffect(() => {
    if (!chat || !socket) return;
    const messageReceiver = (message: DirectMessage) => {
      setMessages((p) => [...p, message]);
      const scrollTop =
        chatDivRef.current!.scrollHeight - chatDivRef.current!.clientHeight;
      chatDivRef.current?.scrollTo({ top: scrollTop, behavior: "smooth" });
    };

    if (chat.isGroupChat) {
      // socket.emit("join-group-message", { receiverName: chat.id });
      // socket.on("receive-group-message", messageReceiver);
    } else {
      socket.emit("join-direct-message", { receiverName: chat.name });
      socket.on("receive-direct-message", messageReceiver);
    }

    return () => {
      if (chat.isGroupChat) {
        // socket.off("receive-group-message", messageReceiver);
        // socket?.emit("leave-group-message", { receiverName: chat.id });
      } else {
        socket.off("receive-direct-message", messageReceiver);
        socket?.emit("leave-direct-message", { receiverName: chat.name });
      }
    };
  }, [socket, chat]);

  const handleLoadMore = async () => {
    if (!hasMore) return;

    prevScrollHeightRef.current = {
      scrollTop: chatDivRef.current?.scrollTop,
      scrollHeight: chatDivRef.current?.scrollHeight,
    };

    const messagesUrl = chat?.isGroupChat
      ? "/api/group/messages"
      : "/api/direct-message";

    const payload = {
      groupId: chat!.id,
      receiverId: chat!.id,
      timestamp: messages[0].createdAt,
      id: messages[0].id,
    };
    const { data: resData } = await axios.post<ResponseData>(
      messagesUrl,
      payload
    );
    const { data, ok } = resData;
    if (ok) {
      data.results.reverse();
      setMessages((p) => [...data.results, ...p]);
      setHasMore(data.hasMore);
      const newScrollPos =
        chatDivRef.current!.scrollHeight -
        prevScrollHeightRef.current.scrollHeight;
      chatDivRef.current!.scrollTo({ top: newScrollPos });
    }
  };

  if (!chat) {
    return (
      <div className="flex-grow overflow-x-hidden overflow-y-auto">
        <Splash isfullScreen={false} spinner={false} text={splashText} />
      </div>
    );
  }

  return (
    <div
      className="flex-grow overflow-x-hidden overflow-y-auto pb-20"
      ref={chatDivRef}
    >
      {hasMore ? (
        <button
          className="py-1 px-3 rounded m-1 border-2 border-gray-300 uppercase text-sm hover:bg-gray-300"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      ) : (
        <p
          style={{ width: "fit-content" }}
          className="text-center text-sm bg-yellow-100 p-1 px-3 m-auto mt-2 mb-2 text-gray-600 rounded shadow"
        >
          Messages are end-to-end encrypted
        </p>
      )}

      {messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          message={{
            ...msg,
            senderName: msg.senderId === user!.id ? user?.username! : chat.name,
            receiverName:
              msg.senderId === user!.id ? chat.name : user?.username!,
          }}
        />
      ))}
    </div>
  );
};

const splashText =
  "Start a chat either by creating a new one or by selecting a previous from the sidebar";

export default Chat;
