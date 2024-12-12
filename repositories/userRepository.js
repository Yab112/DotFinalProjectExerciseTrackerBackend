import UserModel from "../models/userModel.js";

const createUser = (data) => UserModel.create(data);

const findUserByUsername = async (email) => {
    return UserModel.findOne({ email }); 
  };


export default { createUser, findUserByUsername };
