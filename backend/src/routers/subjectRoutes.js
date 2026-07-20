import { Router } from "express";
import { getSubject, createSubject } from "../controllers/subjectControllers.js";
const router = Router();

router.get("/:id", getSubject);
router.post("/", createSubject);
export default router;