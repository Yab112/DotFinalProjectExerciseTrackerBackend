import Exercise from "../models/ExerciseModel.js"
import mongoose from "mongoose";
const createExercise = async (exerciseData) => {
  return await Exercise.create(exerciseData);
};

const getExercisesByUser = async (userId) => {
  return await Exercise.find({ userId }).sort({ date: -1 });
};

const getExerciseById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID format");
    }
    return await Exercise.findById(id);
  };
  

const updateExercise = async (id, updateData) => {
  return await Exercise.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteExercise = async (id) => {
  return await Exercise.findByIdAndDelete(id);
};

export default {
  createExercise,
  getExercisesByUser,
  getExerciseById,
  updateExercise,
  deleteExercise
};
