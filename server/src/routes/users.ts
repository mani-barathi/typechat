import { Router } from "express";
import { EntityNotFoundError } from "typeorm";

import User from "../entities/User";
import { isAuthenticated } from "../middlewares/auth";

const router = Router();

router.get("/:username", isAuthenticated, async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOneOrFail({ username });
    return res.json({ ok: true, data: user });
  } catch (e) {
    if (e instanceof EntityNotFoundError)
      return res.json({ ok: false, error: "no user exists with that name" });
    return res.status(500).json({ ok: false, error: "somethi went wrong" });
  }
});

export default router;
