import { Router } from "express";
import {login, logout, signup, verifyUsers} from "../controllers/authControllers.js";
import {validateLogin, validateRegister} from "../middleware/validateAuthInputs.js";
import { limiter } from "../middleware/rateLimiter.js";
import requireAuth from "../middleware/authMiddleware.js";

const router = Router();
router.get("/verify", requireAuth, verifyUsers)
router.post("/signup", limiter, validateRegister, signup);
router.post("/login", validateLogin, login);
router.post("/logout", logout);

export default router;
