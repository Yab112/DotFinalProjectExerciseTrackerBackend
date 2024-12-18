import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

const register = async (data) => {
  data.password = await bcrypt.hash(data.password, 10);

  const verificationToken = crypto.randomBytes(32).toString("hex");
  data.verificationToken = verificationToken;

  const user = await userRepository.createUser(data);
  
  // Send email confirmation
  const verificationLink = `${process.env.BASE_URL}/verify-email?token=${verificationToken}`;
  await sendEmail(
    user.email,
    "Welcome to MonochromeReads - Verify Your Email",
    `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #007BFF; color: #ffffff; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Welcome to MonochromeReads!</h1>
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 16px;">Hi <strong>${user.username}</strong>,</p>
        <p>Thank you for joining <strong>MonochromeReads</strong>! We're thrilled to have you on board and can't wait for you to dive into our collection.</p>
        <p>Before you get started, please confirm your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${verificationLink}" style="display: inline-block; background-color: #007BFF; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 16px;">Verify Your Email</a>
        </div>
        <p>If the button above doesn't work, you can also verify your email by clicking this link:</p>
        <p><a href="${verificationLink}" style="color: #007BFF;">${verificationLink}</a></p>
        <p style="margin-top: 20px;">If you didn't create an account with us, you can safely ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p>Welcome again, and happy reading!</p>
        <p style="font-weight: bold;">Best Regards,<br>The MonochromeReads Team</p>
      </div>
      <div style="background-color: #f9f9f9; color: #777; padding: 15px; text-align: center; font-size: 12px;">
        <p style="margin: 0;">Need help? <a href="${process.env.BASE_URL}/support" style="color: #007BFF;">Contact us</a></p>
        <p style="margin: 0;">&copy; ${new Date().getFullYear()} MonochromeReads. All rights reserved.</p>
      </div>
    </div>
    `
  );
  
  

  return {
    message: "Registration successful! Please check your email to verify your account.",
  };
};


const resendVerificationEmail = async (email) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (user.isVerified) {
    const error = new Error("User is already verified.");
    error.statusCode = 400;
    throw error;
  }

  // Generate a new token
  const newVerificationToken = crypto.randomBytes(32).toString("hex");
  user.verificationToken = newVerificationToken;
  await user.save();

  // Send the verification email
  const verificationLink = `${process.env.BASE_URL}/verify-email?token=${newVerificationToken}`;
  await sendEmail(
    user.email,
    "Welcome to MonochromeReads - Verify Your Email",
    `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #007BFF; color: #ffffff; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Welcome to MonochromeReads!</h1>
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 16px;">Hi <strong>${user.username}</strong>,</p>
        <p>Thank you for joining <strong>MonochromeReads</strong>! We're thrilled to have you on board and can't wait for you to dive into our collection.</p>
        <p>Before you get started, please confirm your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${verificationLink}" style="display: inline-block; background-color: #007BFF; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 16px;">Verify Your Email</a>
        </div>
        <p>If the button above doesn't work, you can also verify your email by clicking this link:</p>
        <p><a href="${verificationLink}" style="color: #007BFF;">${verificationLink}</a></p>
        <p style="margin-top: 20px;">If you didn't create an account with us, you can safely ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p>Welcome again, and happy reading!</p>
        <p style="font-weight: bold;">Best Regards,<br>The MonochromeReads Team</p>
      </div>
      <div style="background-color: #f9f9f9; color: #777; padding: 15px; text-align: center; font-size: 12px;">
        <p style="margin: 0;">Need help? <a href="${process.env.BASE_URL}/support" style="color: #007BFF;">Contact us</a></p>
        <p style="margin: 0;">&copy; ${new Date().getFullYear()} MonochromeReads. All rights reserved.</p>
      </div>
    </div>
    `
  );
  

  return {
    message: "Verification email resent. Please check your inbox.",
  };
};

const verifyEmail = async (token) => {
  const user = await userRepository.findByVerificationToken(token);
  if (!user) {
    throw new Error("Invalid or expired token");
  }

  user.isVerified = true;
  user.verificationToken = null; 
  await user.save();

  return { message: "Email successfully verified" };
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

export default { register, login ,verifyEmail,resendVerificationEmail};
