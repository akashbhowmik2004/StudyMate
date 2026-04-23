import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import {getDashboard,getCommunityPage} from "../controllers/userControllers.js"

const router = express.Router();

router.get("/dashboard", checkAuth, getDashboard);
router.get("/:id/community",checkAuth,getCommunityPage);

export default router;