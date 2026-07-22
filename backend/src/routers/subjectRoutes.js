import { Router } from "express";
import { getSubject, createSubject, getAllSubjects } from "../controllers/subjectControllers.js";
import { limiter } from "../middleware/rateLimiter.js";
const router = Router();

router.get("/",limiter, getAllSubjects);
router.get("/:id",limiter, getSubject);
router.post("/", limiter, createSubject);

export default router;