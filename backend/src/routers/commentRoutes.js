import { Router } from "express";
import {
  commentDoubt,
  deleteComment,
  editComment,
  getComment,
  getAllCommentsForDoubt,
} from "../controllers/commentControllers.js";

const router = Router();

router.get("/:id", getComment);
router.get("/doubts/:id", getAllCommentsForDoubt);
router.post("/doubts/:id", commentDoubt);
router.put("/:id", editComment);
router.delete("/:id", deleteComment);

export default router;
