import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  name: { type: String, required: true },
  category: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
  intensity: { type: String, default: "Medium" }, // Optional field
  caloriesBurned: { type: Number }, // Optional field
  notes: { type: String }, // Optional field
  type: { type: String, default: "Indoor" }, // Optional field
  iscomplated: { type: Boolean, default: false }, // Optional field
  location: { type: String }, // Optional field
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default   mongoose.model("Exercise", ExerciseSchema);
