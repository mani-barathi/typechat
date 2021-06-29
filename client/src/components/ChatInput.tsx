import React from "react";

interface ChatInputProps {}

const ChatInput: React.FC<ChatInputProps> = () => {
  return (
    <div className="p-2 bg-purple-500 xl:rounded-br">
      <h1 className="text-2xl">Chat Input</h1>
    </div>
  );
};

export default ChatInput;
