import Router from 'express';
import { signUp,Login,Logout } from '../controllers/authControllers.js';

const router = Router();


router.post("/signup", signUp);
router.post("/login",Login);
router.post("/logout",Logout);


export default router;