import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authorize = (req, res, next) => {
  // Log middleware entry
  console.log("authorize middleware called");

  // Get token from header
  const token = req.header('jwt_token');
  console.log('Received token:', token);

  // Check if no token
  if (!token) {
    console.log('No token provided');
    return res.status(403).json({ msg: 'Authorization denied' });
  }

  // Handle 'Bearer' prefix if present
  const actualToken = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;
  console.log('Actual token:', actualToken);

  // Verify token
  try {
    const verify = jwt.verify(actualToken, process.env.JWT_SECRET_KEY);
    console.log('Token verified successfully:', verify);
    req.user = verify.user; // Attach user information from token to the request
    next(); // Move to the next middleware or route handler
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default authorize;
