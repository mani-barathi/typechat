import React from "react";
import cn from "classnames";

interface SplashProps {
  isfullScreen?: Boolean;
  spinner?: Boolean;
  text?: string;
}

const Splash: React.FC<SplashProps> = ({
  isfullScreen = true,
  spinner = true,
  text = "",
}) => {
  return (
    <div
      className={cn("bg-gray-100 flex items-center justify-center", {
        "w-screen h-screen": isfullScreen,
        "w-full h-full": !isfullScreen,
        rounded: !isfullScreen,
      })}
    >
      <div className="transition-all transform -translate-y-9 flex flex-col items-center">
        <h1 className="text-6xl text-center text-green-600 animate-pulse">
          TypeChat
        </h1>
        {text && <h3 className="text-gray-500 mt-2 text-center">{text}</h3>}

        {spinner && (
          <div className="rounded-full mt-5 h-10 w-10 border-t-2 border-b-2 border-green-500 animate-spin p-2"></div>
        )}
      </div>
    </div>
  );
};

export default Splash;
