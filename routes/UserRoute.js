import express from "express";
import {
  updatePassword,
  deleteAccount,
  modifyAccount,
} from "../controllers/UserController.js";

const router = express.Router();

// Update Password
router.put("/:id/update-password", updatePassword);

// Modify Account Details
router.put("/:id", modifyAccount);

// Delete Account
router.delete("/:id", deleteAccount);

export default router;
