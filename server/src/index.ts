import "reflect-metadata";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { createConnection } from "typeorm";

import authRoutes from "./routes/auth";
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
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.get("/", (req, res) => {
    console.log(req.cookies.pot);
    res.send({ message: "Hello World" });
  });
  app.use("/api/auth", authRoutes);

  app.listen(PORT, () => console.log(`server: http://localhost:${PORT}/`));
};

main();
