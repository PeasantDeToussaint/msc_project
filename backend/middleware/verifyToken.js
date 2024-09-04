import pkg from "jsonwebtoken";
const { verify } = pkg;
import 'dotenv/config';

// Middleware to verify token
export default function verifyToken(req, res, next) {
  // Get token from header
  console.log("VerifyTokenMiddleware is being called"); 
  const token = req.header("Authorization");
  console.log("Received token:", token);


  // Check if not token
  if (!token) {
    console.log("Authorization header is missing or empty");
    return res.status(403).json({ msg: "authorization denied" });
  }
  const actualToken = token.startsWith('Bearer') ? token.slice(8) : token;
  console.log("Actual token after processing:", actualToken);

  // Verify token
  try {
    const verified = verify(token, process.env.JWT_SECRET_KEY);
    console.log("Token verified successfully:", verified);
    req.user = verified.user;
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};