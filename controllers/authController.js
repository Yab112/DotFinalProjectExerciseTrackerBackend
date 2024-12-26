import authService from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const response = await authService.register(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      message: error.message || "An error occurred during registration.",
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const response = await authService.verifyEmail(token);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      message: error.message || "An error occurred during verification.",
    });
  }
};

export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const response = await authService.resendVerificationEmail(email);
    res.status(200).json(response);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "An error occurred while resending the email.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const userDetails = await authService.login(req.body);
    res.status(200).json({ userDetails });
  } catch (error) {
    res.status(401).json({
      message: error.message || "Invalid credentials. Login failed.",
    });
  }
};


