import React from "react";
import SideBar from "../components/SideBar";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div
      className="w-full h-full bg-white max-w-screen-xl border rounded shadow-lg"
      style={{ maxHeight: "670px" }}
    >
      <SideBar />
      {/* Main Chat Section */}
    </div>
  );
};

export default HomePage;
