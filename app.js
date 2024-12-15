import express from 'express';
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: ["https://final-session-dot.vercel.app", "http://localhost:5173"], 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true, 
  }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);




export default app