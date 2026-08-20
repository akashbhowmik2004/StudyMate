import { Router } from "express";
import {
  sendFollowRequest,
  getFollowRequests,
  acceptFollowRequest,
  rejectFollowRequest,
  unfollowUser,
  sendFollowRequestByUniqueId
} from "../controllers/followUnfollowControllers.js";

const router = Router();

router.get("/requests", getFollowRequests);
router.post("/send-request-by-unique-id", sendFollowRequestByUniqueId);
router.post("/send-request/:receiverId", sendFollowRequest);
router.put("/accept-request/:senderId", acceptFollowRequest);
router.put("/reject-request/:senderId", rejectFollowRequest);
router.put("/unfollow/:userId", unfollowUser);

export default router;
