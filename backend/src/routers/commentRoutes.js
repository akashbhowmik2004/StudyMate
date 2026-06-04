import {Router} from "express";
import {commentDoubt, deleteComment, getComment} from "../controllers/commentControllers.js";

const router = Router();

router.get("/:id", getComment);
router.post("/doubts/:id", commentDoubt);
router.delete("/:id", deleteComment);

export default router;