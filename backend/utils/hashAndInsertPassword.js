import bcrypt from 'bcryptjs';
import pool from '../db.js';  // Adjust the path based on your project structure

const hashAndInsertPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO admin (password) VALUES ($1)', [hashedPassword]);
    console.log('Admin password hashed and inserted successfully');
  } catch (error) {
    console.error('Error hashing and inserting password:', error);
  }
};

hashAndInsertPassword('shanda7019082');