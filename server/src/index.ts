import "reflect-metadata";
import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createConnection } from "typeorm";

import authRoutes from "./routes/auth";
import usersRoutes from "./routes/users";
import { PORT } from "./contants";

const main = async () => {
  await createConnection({
    type: "postgres",
    url: "postgresql://postgres:1234@localhost:5432/typechat",
    logging: true,
    // synchronize: true,
    entities: [path.join(__dirname, "./entities/*")],
  });

  const app = express();
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

  // Routes
  app.get("/", (_, res) => res.send({ message: "Hello World" }));
  app.use("/api/auth", authRoutes);
  app.use("/api/users", usersRoutes);

  app.listen(PORT, () => console.log(`server: http://localhost:${PORT}/`));
};

main();
