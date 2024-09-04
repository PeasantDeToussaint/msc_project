import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../../db.js';  // Adjust the path based on your project structure

const router = express.Router();

// Validate admin password route
router.post('/validate-admin-password', async (req, res) => {
  const { password } = req.body;

  console.log('Received request to validate admin password');

  try {
    const result = await pool.query('SELECT password FROM admin LIMIT 1');
    if (result.rows.length === 0) {
      console.error('Admin not found');
      return res.status(400).json({ message: 'Admin not found' });
    }

    const { password: hashedPassword } = result.rows[0];
    const isValid = await bcrypt.compare(password, hashedPassword);

    if (isValid) {
      console.log('Access granted');
      res.status(200).json({ message: 'Access granted' });
    } else {
      console.error('Invalid password');
      res.status(401).json({ message: 'Invalid password' });
    }
  } catch (error) {
    console.error('Error validating admin password:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
