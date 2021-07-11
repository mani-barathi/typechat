import React, { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { fetchNewTokens, getAccessToken } from "../utils/token";
import { useAuth } from "./AuthContext";

interface SocketContextProps {}

type SocketState = Socket | null;

interface SocketContextType {
  socket: SocketState;
  notificationSocket: SocketState;
  setSocket: React.Dispatch<React.SetStateAction<SocketState>>;
}

const defaultValue: SocketContextType = {
  socket: null,
  notificationSocket: null,
  setSocket: () => {},
};

const SocketContext = createContext(defaultValue);

const SocketProvider: React.FC<SocketContextProps> = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState<SocketState>(defaultValue.socket);
  const [notificationSocket, setNotificationSocket] = useState<SocketState>(
    defaultValue.socket
  );

  useEffect(() => {
    if (!user) return;

    const handleSocketError = async (error: any) => {
      await fetchNewTokens();
      console.log(error);
    };
    let newSocket: SocketState;
    let newNotificationSocket: SocketState;
    const connectSocket = async () => {
      await fetchNewTokens();
      // for listening to messages
      newSocket = io("http://localhost:4000/", {
        auth: { accessToken: getAccessToken() },
      });

      // for listening for notifications
      newNotificationSocket = io("http://localhost:4000/notification", {
        auth: { accessToken: getAccessToken() },
      });

      newSocket.on("connect", () => setSocket(newSocket));
      newNotificationSocket.on("connect", () =>
        setNotificationSocket(newNotificationSocket)
      );

      newSocket.on("connect_error", handleSocketError);
      newNotificationSocket.on("connect_error", handleSocketError);
    };
    connectSocket();

    return () => {
      newSocket?.close();
      newNotificationSocket?.close();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, notificationSocket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;
