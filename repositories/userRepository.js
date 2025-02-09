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

const findOrCreate = async (profile) => {
    const user = await UserModel.findOne({ email: profile.emails[0].value });
  
    if (user) {
      // Update existing user with new data
      user.username = profile.displayName || user.username;
      user.profilePicture = profile.photos[0].value || user.profilePicture;
      user.isVerified = true; 
      user.verificationToken = null; 
      await user.save();
      return user;
    } else {
      // Create new user if not found
      const newUser = new UserModel({
        username: profile.displayName,
        email: profile.emails[0].value,
        profilePicture: profile.photos[0].value,
        isVerified: true, 
        verificationToken: null, 
      });
      await newUser.save();
      return newUser;
    }
  };
  

  const findById = async (id) => {
    return await User.findById(id);
  };
  
  const updateUser = async (id, updates) => {
    return await User.findByIdAndUpdate(id, updates, { new: true });
  };
  
  const deleteUser = async (id) => {
    const result = await User.findByIdAndDelete(id);
    return !!result; // Returns true if a user was deleted, false otherwise
  };
  

export default { createUser, findUserByUsername ,findByVerificationToken,findOrCreate, findById, updateUser, deleteUser};
