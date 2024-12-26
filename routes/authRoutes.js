import express from "express";
import { register, login, verifyEmail, resendVerificationEmail } from "../controllers/authController.js";
import passport from "../config/passport.js";

const router = express.Router();

router.post("/register", register);
router.get("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/resend-verification-email", resendVerificationEmail);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    console.log('User authenticated:', req.user);

    const token = req.user.token; // User's token
    const username = req.user.username; // User's username
    const userId = req.user._id; // User's ID

    // Redirect to the frontend with token, username, and userId
    res.redirect(
      `${process.env.FRONTEND_URL}/set-token?token=${token}&username=${encodeURIComponent(
        username
      )}&userId=${userId}`
    );
  }
);


// Get user info
router.get('/user', (req, res) => {
  res.send(req.user || null);
});

export default router;
