import React from "react";
import { DirectMessage } from "../types/entities";

interface ChatMessageProps {
  message: DirectMessage;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { id, sender, text } = message;
  return (
    <p key={id}>
      <span className="font-semibold">{sender?.username}</span> : {text}
    </p>
  );
};

export default ChatMessage;
