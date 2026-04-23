import express from "express";
import connectDB from "./config/user.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import {checkAuth} from "./middleware/checkAuth.js"
import authRoutes from "./routers/authRoutes.js";
import userRouter from "./routers/userRoutes.js"
import postRouter from "./routers/postRoutes.js"

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);
app.use("/",userRouter);
app.use("/api/post",postRouter);



connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
