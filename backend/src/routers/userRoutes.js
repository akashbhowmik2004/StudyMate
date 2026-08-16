import { Router } from "express";
import {
  deleteProfile,
  getUser,
  updateProfile,
  followUser,
  unfollowUser,
} from "../controllers/userControllers.js";
import { validateProfile } from "../middleware/validateUser.js";

const router = Router();

router.get("/:id", getUser);
router.put("/follow/:id", followUser);
router.put("/unfollow/:id", unfollowUser);
router.patch("/profile", validateProfile, updateProfile);
router.delete("/deleteprofile", deleteProfile);

export default router;
