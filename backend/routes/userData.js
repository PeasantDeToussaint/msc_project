// routes/user.js
import express from 'express';
import pool from '../db.js'; // Your database connection

const router = express.Router();

// Get user details and essays by user ID
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Query for user details
    const userQuery = `
      SELECT id, name, email FROM users WHERE id = $1
    `;
    const userResult = await pool.query(userQuery, [userId]);

    // Query for past essays
    const essaysQuery = `
      SELECT id, prompt, essay, overall_score FROM essays WHERE user_id = $1
    `;
    const essaysResult = await pool.query(essaysQuery, [userId]);

    res.json({
      user: userResult.rows[0],
      essays: essaysResult.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
