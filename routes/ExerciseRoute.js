import express from "express"
import {createExercise, getExercises,getExerciseById,updateExercise,deleteExercise} from "../controllers/ExerciseController.js"

const router = express.Router();

router.post("/", createExercise); // Create an exercise
router.get("/:userId", getExercises); // Get all exercises for a user
router.get("/detail/:id", getExerciseById); // Get exercise by ID
router.put("/:id", updateExercise); // Update exercise 
router.delete("/:id", deleteExercise); // Delete exercise

export default router;
