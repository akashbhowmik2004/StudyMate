import { Router } from "express";
import {
  deleteProfile,
  getUser,
  updateProfile,
} from "../controllers/userControllers.js";
import { validateProfile } from "../middleware/validateUser.js";

const router = Router();

router.get("/:id", getUser);
router.patch("/profile", validateProfile, updateProfile);
router.delete("/deleteprofile", deleteProfile);

export default router;
