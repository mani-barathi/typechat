import React, { useRef } from "react";
import { ArrowRightIcon } from "@heroicons/react/outline";

interface ChatInputProps {}

const ChatInput: React.FC<ChatInputProps> = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage: React.FormEventHandler = (e) => {
    e.preventDefault();
    console.log(inputRef.current?.value);

    inputRef.current!.value = "";
  };

  return (
    <form className="bg-gray-100 xl:rounded-br" onSubmit={handleSendMessage}>
      <div className="flex items-center bg-white border-2 border-gray-400 rounded-full py-1 px-1 transition focus-within:border-green-400">
        <input
          autoFocus
          type="text"
          ref={inputRef}
          className="flex-grow outline-none font-medium bg-white px-3"
          placeholder="Type a message"
        />
        <button className="ml-2 rounded-full bg-green-500 p-2 text-white hover:bg-green-400 hover:text-black transition transform active:scale-95">
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
