import {Router} from "express";
import {createMessage, getMessagesByCommunity, deleteMessage} from "../controllers/messageControllers.js";

const router = Router();

router.get("/:communityId", getMessagesByCommunity);
router.post("/",createMessage );
router.delete("/:id", deleteMessage);

export default router;