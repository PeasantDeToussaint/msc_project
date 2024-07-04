import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function jwtGenerator(user_id) {
    const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    throw new Error("JWT secret is not defined.");
  }

  const payload = {
    user: {
      id: user_id
    }
  };

  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
}

export default jwtGenerator;