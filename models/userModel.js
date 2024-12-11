import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: "user" },
    profilePicture: { type: String, default: null }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
