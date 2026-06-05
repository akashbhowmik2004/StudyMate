import { Router } from "express";
import {
  createCommunity,
  findCommunity,
  joinCommunity,
  leaveCommunity,
} from "../controllers/communityControllers.js";

const router = Router();

router.post("/", createCommunity);
router.get("/:id", findCommunity);
router.put("/join/:id", joinCommunity);
router.put("/leave/:id", leaveCommunity);

export default router;
