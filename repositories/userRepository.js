import UserModel from "../models/userModel.js";

const createUser = (data) => UserModel.create(data);

const findByVerificationToken = (token) =>
  UserModel.findOne({ verificationToken: token });


const findUserByUsername = async (email) => {
    return UserModel.findOne({ email }); 
  };

const findByEmail = async (email) => {
   return UserModel.findOne({ email });
  };


export default { createUser, findUserByUsername ,findByVerificationToken};
