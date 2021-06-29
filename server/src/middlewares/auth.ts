import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/tokens";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    const token = authorization!.split(" ")[1];

    const payload = verifyAccessToken(token);
    if (!payload) {
      throw new Error("invalid token");
    }
    req.user = { id: payload.id, username: payload.username };
    return next();
  } catch (e) {
    return res.status(401).json({ ok: false, error: "not authorized" });
  }
};
