import express from "express";
import { getAllPost,addPost,addComments } from "../controllers/postControllers.js";
import {checkAuth }from "../middleware/checkAuth.js"

const router = express.Router();

router.get("/",checkAuth,getAllPost);
router.post("/",checkAuth,addPost);

router.post("/:id/comment",checkAuth,addComments);

export default router;