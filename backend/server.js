import express from "express";
import authRoutes from "./src/routers/authRoutes.js";
import mongoose from "mongoose";
import doubtRoutes from "./src/routers/doubtRoutes.js";
import requireAuth from "./src/middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import commentRoutes from "./src/routers/commentRoutes.js";
import communityRoutes from "./src/routers/communityRoutes.js";
import noteRoutes from "./src/routers/noteRoutes.js"
import userRoutes from "./src/routers/userRoutes.js"
import { limiter } from "./src/middleware/rateLimiter.js";
import cors from "cors";

const app = express();
const port = 3000;
dotenv.config();

app.use(
    cors({
      origin: "http://localhost:5173",
    }),
);

app.use(express.json());
app.use(cookieParser());
app.use(limiter);
app.use("/auth", authRoutes);
app.use("/api/users", requireAuth, userRoutes);
app.use("/api/doubts", requireAuth, doubtRoutes);
app.use("/api/comment", requireAuth, commentRoutes);
app.use("/api/communities", requireAuth, communityRoutes);
app.use("/api/notes", requireAuth, noteRoutes);

await mongoose.connect(process.env["MONGODB_URI"]).then(() => {
  console.log("MongoDB connected successfully");
  app.listen(port, () => {
    console.log(`Listening to port ${port}`);
  });
});
