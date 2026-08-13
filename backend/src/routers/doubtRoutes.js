import { Router } from "express";
import {
  deleteDoubt,
  editDoubt,
  getDoubt,
  likeAndDislikeDoubt,
  postDoubts,
  getAllDoubts,
} from "../controllers/doubtControllers.js";
import { validateCreateDoubt } from "../middleware/validateDoubtInput.js";

const router = Router();

router.get("/", getAllDoubts);
router.post("/", validateCreateDoubt, postDoubts);
router.get("/:id", getDoubt);
router.put("/:id", editDoubt);
router.put("/:id/like", likeAndDislikeDoubt);
router.delete("/:id", deleteDoubt);

export default router;
