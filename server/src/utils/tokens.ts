import { Response } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME, PROD, SECRET1, SECRET2 } from "../contants";
import User from "../entities/User.js";
import { JWTPayload } from "../types";

export const createTokens = async (user: User) => {
  const { username, id } = user;
  const payload = { username, id };

  const accessToken = jwt.sign(payload, process.env.SECRET1, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(payload, process.env.SECRET2, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (accessToken: string): JWTPayload | null => {
  try {
    const data = jwt.verify(accessToken, SECRET1);
    return data as JWTPayload;
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (refreshToken: string): JWTPayload | null => {
  try {
    const data = jwt.verify(refreshToken, SECRET2);
    return data as JWTPayload;
  } catch (error) {
    return null;
  }
};

export const sendRefreshTokenAsCookie = (
  res: Response,
  refreshToken: string
) => {
  res.cookie(COOKIE_NAME, refreshToken, {
    httpOnly: true,
    path: "/api/auth/refresh",
    secure: PROD,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
};

export const clearRefreshTokenCookie = (res: Response) => {
  res.cookie(COOKIE_NAME, "", {
    httpOnly: true,
    path: "/api/auth/refresh",
    secure: PROD,
    maxAge: 0,
  });
};
