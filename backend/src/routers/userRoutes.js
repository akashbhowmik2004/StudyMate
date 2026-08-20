import { Router } from "express";
import {
  deleteProfile,
  getUser,
  updateProfile,
  followUser,
  unfollowUser,
  findFollowers,
  findFollowings
} from "../controllers/userControllers.js";
import { validateProfile } from "../middleware/validateUser.js";

const router = Router();

router.get("/followers", findFollowers);
router.get("/followings", findFollowings);
router.delete("/deleteprofile", deleteProfile);
router.patch("/profile", validateProfile, updateProfile);
router.get("/:id", getUser);
router.put("/follow/:id", followUser);
router.put("/unfollow/:id", unfollowUser);

export default router;
