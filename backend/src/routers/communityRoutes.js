import { Router } from "express";
import {
  createCommunity,
  deleteCommunity,
  findCommunity,
  getAllCommunities,
  joinCommunity,
  leaveCommunity,
} from "../controllers/communityControllers.js";

const router = Router();

router.post("/", createCommunity);
router.get("/", getAllCommunities);
router.get("/:id", findCommunity);
router.put("/join", joinCommunity);
router.put("/leave/:id", leaveCommunity);
router.delete("/:id", deleteCommunity);

export default router;
