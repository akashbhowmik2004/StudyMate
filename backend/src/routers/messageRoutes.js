import {Router} from "express";
import {createMessage, getMessagesByCommunity, deleteMessage} from "../controllers/messageControllers.js";

const router = Router();

router.post("/",createMessage );
router.get("/:communityId", getMessagesByCommunity);
router.delete("/:id", deleteMessage);

export default router;