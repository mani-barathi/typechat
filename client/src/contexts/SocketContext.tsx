import React, { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { fetchNewTokens, getAccessToken } from "../utils/token";
import { useAuth } from "./AuthContext";

interface SocketContextProps {}

type SocketState = Socket | null;

interface SocketContextType {
  socket: SocketState;
  setSocket: React.Dispatch<React.SetStateAction<SocketState>>;
}

const defaultValue: SocketContextType = { socket: null, setSocket: () => {} };

const SocketContext = createContext(defaultValue);

const SocketProvider: React.FC<SocketContextProps> = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState<SocketState>(defaultValue.socket);

  useEffect(() => {
    if (!user) return;

    let newSocket: SocketState;
    const connectSocket = async () => {
      await fetchNewTokens();
      newSocket = io("http://localhost:4000/", {
        auth: { accessToken: getAccessToken() },
      });

      newSocket.on("connect", () => setSocket(newSocket));

      newSocket.on("connect_error", async (error: any) => {
        await fetchNewTokens();
        console.log(error);
      });
    };
    connectSocket();

    return () => {
      newSocket?.close();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;
