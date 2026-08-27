import { Router } from "express";
import { getDashboardData } from "../controllers/dashboardControllers.js";

const router = Router();

router.get("/", getDashboardData);

export default router;
