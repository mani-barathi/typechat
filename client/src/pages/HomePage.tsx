import React from "react";
import SideBar from "../components/SideBar";
import Chat from "../components/Chat";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div
      className="w-full h-full flex bg-white max-w-screen-xl border rounded shadow-lg"
      style={{ maxHeight: "750px", height: "98%" }}
    >
      <SideBar />

      <div className="flex-grow bg-gray-50 flex flex-col">
        <ChatHeader />
        <Chat />
        <ChatInput />
      </div>
    </div>
  );
};

export default HomePage;
