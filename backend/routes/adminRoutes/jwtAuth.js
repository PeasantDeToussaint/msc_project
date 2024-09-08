import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";
import pool from "../../db.js";
import validInfo from "../../middleware/validInfo.js";
import jwtGenerator from "../../utils/jwtGenerator.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Authentication

function generateRefreshToken(userId) {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

router.post("/register", validInfo, async (req, res) => {
  const { email, name, password, dateOfBirth } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("User already exists!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password, date_of_birth) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, bcryptPassword, dateOfBirth]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].user_id);

    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }

    const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/verify", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err.message);
      return res.status(403).json({ error: 'Token is not valid' });
    }
    console.log('Decoded token:', decoded);
    res.json({ valid: true });
  });
});

// Password Reset

router.post("/resetPasswordRequest", async (req, res) => {
  const { email, dateOfBirth } = req.body;

  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE user_email = $1 AND date_of_birth = $2",
      [email, dateOfBirth]
    );

    if (user.rows.length === 0) {
      return res.status(400).json("User not found or information doesn't match");
    }

    const resetToken = jwt.sign(
      { userId: user.rows[0].user_id },
      process.env.RESET_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: "Password reset requested", resetToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/resetPassword", async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    const decoded = jwt.verify(resetToken, process.env.RESET_TOKEN_SECRET);
    const userId = decoded.userId;

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(newPassword, salt);

    await pool.query(
      "UPDATE users SET user_password = $1 WHERE user_id = $2",
      [bcryptPassword, userId]
    );

    res.json({ message: "Password has been reset successfully" });
  } catch (err) {
    console.error(err.message);
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(400).json("Invalid or expired reset token");
    }
    res.status(500).send("Server error");
  }
});

export default router;