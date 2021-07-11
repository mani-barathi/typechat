import "reflect-metadata";
import express from "express";
import { Server, Socket } from "socket.io";
import path from "path";
import { createServer } from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createConnection } from "typeorm";

import authRoutes from "./routes/auth";
import usersRoutes from "./routes/users";
import chatRoutes from "./routes/chats";
import directMessageRoutes from "./routes/directMessages";
import { PORT } from "./contants";
import { getPrivateChatRoomIds } from "./utils/chat";
import { authenticateSocket } from "./middlewares/auth";

const main = async () => {
  await createConnection({
    type: "postgres",
    url: "postgresql://postgres:1234@localhost:5432/typechat",
    logging: true,
    // synchronize: true,
    entities: [path.join(__dirname, "./entities/*")],
  });

  const app = express();
  const httpServer = createServer(app);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
      methods: ["GET", "POST"],
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Socket.io
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN,
    },
  });
  const notificationIo = io.of("/notification");
  notificationIo.use(authenticateSocket).on("connection", (socket: Socket) => {
    socket.on("join-notification", async (data) => {
      await socket.join(data.username);
      console.log(data.username, "is listening for notifications");
    });
    socket.on("leave-notification", async (data) => {
      await socket.leave(data.username);
    });
  });

  io.use(authenticateSocket).on("connection", (socket: Socket) => {
    const { username }: any = socket;
    console.log(`${username} connected!`);

    socket.on("join-direct-message", async (data: any) => {
      const { receiverName } = data;
      const { senderRoomId } = getPrivateChatRoomIds(username, receiverName);
      await socket.join(senderRoomId);
      console.log(`${username} is chatting with ${receiverName}`);
    });

    socket.on("leave-direct-message", async (data: any) => {
      const { receiverName } = data;
      const { senderRoomId } = getPrivateChatRoomIds(username, receiverName);
      await socket.leave(senderRoomId);
      socket.rooms.delete(senderRoomId);
      console.log(`${username} has left ${senderRoomId}`);
    });

    socket.on("disconnect", () => console.log("user disconnected"));
  });

  app.set("io", io);
  app.set("notificationIo", notificationIo);
  // Routes
  app.get("/", (_, res) => res.send({ message: "Hello World" }));
  app.use("/api/auth", authRoutes);
  app.use("/api/users", usersRoutes);
  app.use("/api/direct-message", directMessageRoutes);
  app.use("/api/chats", chatRoutes);

  httpServer.listen(PORT, () => console.log(`http://localhost:${PORT}/`));
};

main();
