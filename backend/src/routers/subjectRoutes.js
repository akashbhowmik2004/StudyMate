import { Router } from "express";
import { getSubject, createSubject, getAllSubjects, deleteSubject } from "../controllers/subjectControllers.js";
import { limiter } from "../middleware/rateLimiter.js";
const router = Router();

router.get("/",limiter, getAllSubjects);
router.post("/", limiter, createSubject);
router.get("/:id",limiter, getSubject);
router.delete("/:id", limiter, deleteSubject);

export default router;