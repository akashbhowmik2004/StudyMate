import {Router} from 'express'
import {login, logout, signup} from "../controllers/authControllers.js";
import {validateRegister} from "../middleware/validateAuth.js";
import { limiter } from '../middleware/rateLimiter.js';


const router = Router();

router.post("/signup",limiter,validateRegister,signup);
router.post("/login",login);
router.post("/logout",logout);

export default router;