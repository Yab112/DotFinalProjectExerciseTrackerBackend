import express from "express";
import {
  createBook,
  getBooks,
  deleteBook,
} from "../controllers/bookController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../utils/Multer.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  createBook
);
router.get("/", authMiddleware, getBooks);
router.delete("/delete", authMiddleware, deleteBook);

export default router;
