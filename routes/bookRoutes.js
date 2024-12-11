import express from "express";
import { createBook, getBooks,deleteBook } from "../controllers/bookController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../utils/fileUpload.js";

const router = express.Router();

router.post("/", authMiddleware, upload.single("file"), createBook);
router.get("/", authMiddleware, getBooks);
router.delete("/delete",authMiddleware, deleteBook);

export default router;  
