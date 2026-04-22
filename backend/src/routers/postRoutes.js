import express from "express";
import { getAllPost,addPost } from "../controllers/postControllers.js";
import {checkAuth }from "../middleware/checkAuth.js"

const router = express.Router();

router.get("/post",checkAuth,getAllPost);
router.post("/post",checkAuth,addPost);

export default router;