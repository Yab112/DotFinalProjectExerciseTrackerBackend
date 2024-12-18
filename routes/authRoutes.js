import express from "express";
import { register, login,verifyEmail,resendVerificationEmail } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.get("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/resend-verification-email", resendVerificationEmail);

export default router;
