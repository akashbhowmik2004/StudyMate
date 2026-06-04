import express from 'express'
import authRoutes from "./src/routers/authRoutes.js";
import mongoose from "mongoose";
import doubtRoutes from "./src/routers/doubtRoutes.js";
import requireAuth from "./src/middleware/authMiddleware.js";
import cookieParser from "cookie-parser"

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/api",requireAuth, doubtRoutes);

await mongoose.connect().then(() => {
    console.log('MongoDB connected successfully');
    app.listen(port, () => {
        console.log(`Listening to port ${port}`);
    })
})
