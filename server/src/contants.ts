import dotenv from "dotenv";
dotenv.config();

export const UNIQUE_CONSTRAINT_ERROR_CODE = "23505";
export const FOREIGN_KEY_CONSTRAINT_ERROR_CODE = "23503";

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = parseInt(process.env.PORT);
export const PROD = NODE_ENV === "production";

export const COOKIE_NAME = process.env.COOKIE_NAME;
export const SECRET1 = process.env.SECRET1;
export const SECRET2 = process.env.SECRET2;
