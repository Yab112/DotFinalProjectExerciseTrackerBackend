import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import UserModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

dotenv.config();

const generateJWT = (user) => {
  return jwt.sign({ id: user._id, email: user.email, name: user.username }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

const findOrCreate = async (profile) => {
    const email = profile.emails?.[0]?.value || `noemail_${profile.id}@google.com`;
    const photo = profile.photos?.[0]?.value || 'default_avatar_url';
  
    try {
      let user = await UserModel.findOne({ email });
  
      if (user) {
        console.log('User found, logging in:', user);
        user.username = profile.displayName || user.username;
        user.profilePicture = photo || user.profilePicture;
        await user.save();
      } else {
        console.log('New user detected, signing up:', email);
        user = new UserModel({
          username: profile.displayName || 'Anonymous User',
          email,
          profilePicture: photo,
          password: `oauth_${profile.id}`,
          isVerified: true,
          verificationToken: null,
        });
        await user.save();
      }
  
      if (!user || !user._id) {
        throw new Error('User creation or retrieval failed');
      }
  
      return user;
    } catch (error) {
      console.error('Error in findOrCreate:', error.message || error);
      throw new Error('Failed to process user authentication');
    }
  };
  

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await findOrCreate(profile);
          const token = generateJWT(user);
          done(null, { ...user.toObject(), token }); // Include the token
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
  
  

  passport.serializeUser((user, done) => {
    if (user && user._id) {
      console.log('Serializing user:', user._id);
      done(null, user._id); // Store only the user's ID
    } else {
      done(new Error('User object does not contain _id'), null);
    }
  });
  
  
  
  
  passport.deserializeUser(async (id, done) => {
    try {
      console.log('Deserializing user with ID:', id);
      const user = await UserModel.findById(id);
      if (user) {
        done(null, user);
      } else {
        done(new Error('User not found'), null);
      }
    } catch (error) {
      console.error('Error in deserializeUser:', error.message || error);
      done(error, null);
    }
  });
  
  
export default passport;
