import {Router} from "express";
import {
    deleteDoubt,
    editDoubt,
    getDoubt,
    likeAndDislikeDoubt,
    postDoubts
} from "../controllers/doubtControllers.js";

const router = Router();

router.get("/:id", getDoubt);
router.post("/", postDoubts);
router.put("/:id", editDoubt);
router.put("/:id/like", likeAndDislikeDoubt);
router.delete("/:id", deleteDoubt);


export default router;