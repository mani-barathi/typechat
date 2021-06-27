import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import { LoginInput, SignUpError, SignUpInput } from "../types";
import { validateSignUp } from "../utils/validations";
import User from "../entities/User";
import { EntityNotFoundError } from "typeorm";
import {
  clearRefreshTokenCookie,
  createTokens,
  sendRefreshTokenAsCookie,
  verifyRefreshToken,
} from "../utils/tokens";
import { COOKIE_NAME } from "../contants";

const router = Router();

router.post("/refresh", async (req: Request, res: Response) => {
  const token = req.cookies[COOKIE_NAME];
  if (!token) {
    return res.json({ ok: false, error: "no token provided" });
  }
  try {
    const payload: any = verifyRefreshToken(token);
    if (!payload) {
      return res.json({ ok: false, error: "invalid token" });
    }

    const user = await User.findOneOrFail({ id: payload.id });
    const { accessToken, refreshToken } = await createTokens(user);
    sendRefreshTokenAsCookie(res, refreshToken);
    const loggedUser = {
      username: user.username,
      email: user.email,
      id: user.id,
    };
    return res.json({ ok: true, data: { user: loggedUser, accessToken } });
  } catch (e) {
    if (e instanceof EntityNotFoundError) {
      return res.status(401).json({ ok: false, error: "no user found" });
    }
    return res.status(500).json({ ok: false, error: "something went wrong" });
  }
});

router.post("/signup", async (req: Request, res: Response) => {
  const { username, email, password }: SignUpInput = req.body;
  const validationErros = validateSignUp(username, email, password);
  if (Object.keys(validationErros).length > 0) {
    return res.json({ ok: false, errors: validationErros });
  }

  try {
    const checkEmail = User.findOne({ email });
    const checkUsername = User.findOne({ username });
    const [isEmailTaken, isUsernameTaken] = await Promise.all([
      checkEmail,
      checkUsername,
    ]);

    const errs: SignUpError = {};
    if (isEmailTaken) errs.email = "email is taken";
    if (isUsernameTaken) errs.username = "username is taken";

    if (Object.keys(errs).length > 0) {
      return res.json({ ok: false, errors: errs });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username.toLowerCase(),
      email,
      password: hashedPassword,
    }).save();

    const data = { username: user.username, email: user.email, id: user.id };
    return res.json({ ok: true, data });
  } catch (e) {
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password }: LoginInput = req.body;
  try {
    const user = await User.findOneOrFail({ email });
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      return res.json({ error: "invalid credentials" });
    }
    const { accessToken, refreshToken } = await createTokens(user);
    sendRefreshTokenAsCookie(res, refreshToken);
    const loggedUser = {
      username: user.username,
      email: user.email,
      id: user.id,
    };
    return res.json({ ok: true, data: { user: loggedUser, accessToken } });
  } catch (e) {
    if (e instanceof EntityNotFoundError) {
      return res.json({ error: "no user found" });
    }
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.post("/logout", (_, res: Response) => {
  clearRefreshTokenCookie(res);
  return res.json({ ok: true });
});

export default router;
