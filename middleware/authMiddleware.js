import jwt from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    req.user = {
      id: decoded.id,
      username: decoded.username,
    };

    next(); 
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.status(401).json({ error: 'Invalid authentication token' });
  }
};

export default authenticateUser;
