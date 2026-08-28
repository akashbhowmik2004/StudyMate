import { Server } from "socket.io";
import express from "express";
import authRoutes from "./src/routers/authRoutes.js";
import mongoose from "mongoose";
import doubtRoutes from "./src/routers/doubtRoutes.js";
import requireAuth from "./src/middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import commentRoutes from "./src/routers/commentRoutes.js";
import communityRoutes from "./src/routers/communityRoutes.js";
import noteRoutes from "./src/routers/noteRoutes.js";
import userRoutes from "./src/routers/userRoutes.js";
import subjectRoutes from "./src/routers/subjectRoutes.js";
import { limiter } from "./src/middleware/rateLimiter.js";
import cors from "cors";
import path from "path";
import { createServer } from "node:http";
import socketHandler from "./src/socket/socket.js";
import messageRoutes from "./src/routers/messageRoutes.js";
import followUnfollowRoutes from "./src/routers/followUnfollowRoutes.js";
import scheduleRoutes from "./src/routers/scheduleRoutes.js";
import dashboardRoutes from "./src/routers/dashboardRoutes.js";
import requireAdmin from "./src/middleware/adminMiddleware.js";
import requireStudent from "./src/middleware/studentMiddleware.js";

const app = express();
const server = createServer(app);
const port = 3000;
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});
socketHandler(io);
app.use("/uploads", express.static(path.join(process.cwd(), "src/uploads")));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.use("/auth", authRoutes);
app.use("/api/users", requireAuth, requireStudent, userRoutes);
app.use("/api/doubts", requireAuth, requireStudent, doubtRoutes);
app.use("/api/comment", requireAuth, requireStudent, commentRoutes);
app.use("/api/communities", requireAuth, requireStudent, communityRoutes);
app.use("/api/notes", requireAuth, requireStudent, noteRoutes);
app.use("/api/subjects", requireAuth, requireStudent, subjectRoutes);
app.use("/api/messages", requireAuth, requireStudent, messageRoutes);
app.use("/api", requireAuth, requireStudent, followUnfollowRoutes);
app.use("/api/schedule", requireAuth, requireStudent, scheduleRoutes);
app.use("/api/dashboard", requireAuth, requireStudent, dashboardRoutes);

await mongoose.connect(process.env["MONGODB_URI"]).then(() => {
  console.log("MongoDB connected successfully");
  server.listen(port, () => {
    console.log(`Listening to port ${port}`);
  });
});
