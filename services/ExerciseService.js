import exerciseRepository from '../repositories/ExerciseRepository.js';

const createExercise = async (exerciseData) => {
  return await exerciseRepository.createExercise(exerciseData);
};

const getAllExercises = async (userId) => {
  return await exerciseRepository.getExercisesByUser(userId);
};

const getExercise = async (id) => {
    console.log("Service received ID:", id); // Add this
    return await exerciseRepository.getExerciseById(id);
  };

  
const updateExercise = async (id, updateData) => {
  return await exerciseRepository.updateExercise(id, updateData);
};

const deleteExercise = async (id) => {
  return await exerciseRepository.deleteExercise(id);
};

export default {
  createExercise,
  getAllExercises,
  getExercise,
  updateExercise,
  deleteExercise
};
