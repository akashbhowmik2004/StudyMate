import { Router } from "express";
import {createSession, findSession, deleteSession, setSessionCompletion} from "../controllers/scheduleControllers.js";
const router = Router();

router.post("/create-session", createSession);
router.get("/find-session", findSession);
router.patch("/set-session-completion/:sessionId", setSessionCompletion);
router.delete("/delete-session/:sessionId", deleteSession);
export default router;