import authService from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message || "An error occurred during registration.",
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
