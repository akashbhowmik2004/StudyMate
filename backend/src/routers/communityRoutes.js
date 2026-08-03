import { Router } from "express";
import {
  createCommunity,
  deleteCommunity,
  findCommunity,
  getAllCommunities,
  joinCommunity,
  leaveCommunity,
  getJoinedCommunities,
  removeMember,
} from "../controllers/communityControllers.js";

const router = Router();

router.post("/", createCommunity);
router.get("/", getAllCommunities);
router.get("/joined", getJoinedCommunities);
router.put("/join", joinCommunity);
router.put("/remove-member/:memberId", removeMember);
router.put("/leave/:id", leaveCommunity);
router.get("/:id", findCommunity);
router.delete("/:id", deleteCommunity);

export default router;
