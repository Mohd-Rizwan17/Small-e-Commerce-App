import { Router } from "express";
import {
  register,
  login,
  getMe,
  refreshAccessToken,
  logout,
} from "../controllers/auth.controller.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator.js";
import validate from "../middlewares/validate.middleware.js";
import authenticate from "../middlewares/authenticate.middleware.js";

const router = Router();

router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", authenticate, logout);
router.get("/me", authenticate, getMe);

export default router;
