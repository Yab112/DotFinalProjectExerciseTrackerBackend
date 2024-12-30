import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";

const updatePassword = async (id, currentPassword, newPassword) => {
  const user = await userRepository.findById(id);
  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordValid) return false;

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return userRepository.updateUser(id, { password: hashedPassword });
};

const modifyAccount = async (id, updatedDetails) => {
  return await userRepository.updateUser(id, updatedDetails);
};

const deleteAccount = async (id) => {
  return await userRepository.deleteUser(id);
};

export default { updatePassword, modifyAccount, deleteAccount };
