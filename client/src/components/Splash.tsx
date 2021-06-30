import React from "react";

interface SplashProps {}

const Splash: React.FC<SplashProps> = () => {
  return (
    <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
      <div className="transition-all transform -translate-y-9 flex flex-col items-center">
        <h1 className="text-6xl text-center text-green-600 animate-pulse">
          TypeChat
        </h1>
        <div className="rounded-full mt-5 h-10 w-10 border-t-2 border-b-2 border-green-500 animate-spin p-2"></div>
      </div>
    </div>
  );
};

export default Splash;
