import express from 'express';
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import exerciseRoutes from "./routes/ExerciseRoute.js"
import passport from 'passport';
import session from 'express-session';
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, 
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    origin: ["https://final-session-dot.vercel.app", "http://localhost:5173"], 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true, 
  }));
  



app.use("/api/auth", authRoutes);
app.use("/api/exercises", exerciseRoutes);




export default app