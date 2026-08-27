import { Router } from "express";
import {
  createSession,
  findSession,
  deleteSession,
  setSessionCompletion,
  getUpcomingSessions,
} from "../controllers/scheduleControllers.js";
const router = Router();

router.post("/create-session", createSession);
router.get("/find-session", findSession);
router.get("/upcoming-sessions", getUpcomingSessions);
router.patch("/set-session-completion/:sessionId", setSessionCompletion);
router.delete("/delete-session/:sessionId", deleteSession);
export default router;
