import {Router} from "express";
import {commentDoubt, deleteComment, editComment, getComment} from "../controllers/commentControllers.js";

const router = Router();

router.get("/:id", getComment);
router.post("/doubts/:id", commentDoubt);
router.put("/:id", editComment);
router.delete("/:id", deleteComment);

export default router;