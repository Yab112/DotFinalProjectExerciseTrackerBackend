import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";

const register = async (data) => {
  data.password = await bcrypt.hash(data.password, 10);
  return userRepository.createUser(data);
};

const login = async (data) => {
    const user = await userRepository.findUserByUsername(data.email);
    
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new error("Invalid credentials");
    }
    const token =jwt.sign(
        { id: user._id, username: user.username }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
    const userDetails = {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture, 
        lastLogin: user.lastLogin, 
        token, 
        expiresIn: process.env.JWT_EXPIRES_IN
      };

    return userDetails
  };

export default { register, login };
