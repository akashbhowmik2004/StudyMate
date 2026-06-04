import {Router} from "express";
import {deleteDoubt, editDoubt, getDoubt, postDoubts} from "../controllers/doubtControllers.js";

const router = Router();

router.get("/doubts/:id", getDoubt);
router.post("/doubts", postDoubts);
router.put("/doubts/:id", editDoubt)
router.delete("/doubts/:id",deleteDoubt);

export default router;