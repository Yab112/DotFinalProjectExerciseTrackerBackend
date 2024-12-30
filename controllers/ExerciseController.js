import exerciseService from '../services/ExerciseService.js';

export const createExercise = async (req, res) => {
  try {
    const newExercise = await exerciseService.createExercise(req.body);
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExercises = async (req, res) => {
  try {
    const exercises = await exerciseService.getAllExercises(req.params.userId);
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExerciseById = async (req, res) => {
    try {
      const exercise = await exerciseService.getExercise(req.params.id);
      if (!exercise) {
        return res.status(404).json({ message: "Exercise not found" });
      }
      res.status(200).json(exercise);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

export const updateExercise = async (req, res) => {
  try {
    const updatedExercise = await exerciseService.updateExercise(req.params.id, req.body);
    if (!updatedExercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    res.status(200).json(updatedExercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteExercise = async (req, res) => {
  try {
    const deletedExercise = await exerciseService.deleteExercise(req.params.id);
    if (!deletedExercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    res.status(200).json({ message: "Exercise deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

