import React from "react";

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
  return (
    <div className="p-2 flex-grow">
      <h1 className="text-2xl">Chat section</h1>
    </div>
  );
};

export default Chat;
