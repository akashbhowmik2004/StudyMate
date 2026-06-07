import {Router} from "express";
import {
    deleteDoubt,
    editDoubt,
    getDoubt,
    likeAndDislikeDoubt,
    postDoubts
} from "../controllers/doubtControllers.js";
import { validateCreateDoubt } from "../middleware/validateDoubt.js";

const router = Router();

router.get("/:id", getDoubt);
router.post("/",validateCreateDoubt, postDoubts);
router.put("/:id", editDoubt);
router.put("/:id/like", likeAndDislikeDoubt);
router.delete("/:id", deleteDoubt);


export default router;