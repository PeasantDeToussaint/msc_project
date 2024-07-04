import pkg from 'jsonwebtoken';
const { verify } = pkg;
import 'dotenv/config';

// Middleware to verify token
export default function verifyToken(req, res, next) {
  // Get token from header
  const token = req.header("jwt_token");

  // Check if not token
  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  // Verify token
  try {
    const verified = verify(token, process.env.JWT_SECRET);
    req.user = verified.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};