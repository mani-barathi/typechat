import "reflect-metadata";
import express from "express";
import path from "path";
import { createConnection } from "typeorm";

const PORT = process.env.PORT || 4000;

const main = async () => {
  await createConnection({
    type: "postgres",
    url: "postgresql://postgres:1234@localhost:5432/typechat",
    logging: true,
    synchronize: true,
    entities: [path.join(__dirname, "./entities/*")],
  });

  const app = express();

  app.get("/", (_, res) => res.send({ message: "Hello World" }));

  app.listen(PORT, () => console.log(`server: http://localhost:${PORT}/`));
};

main();
