import express from 'express';
import pool from '../../db.js'; 
import authorize from '../../middleware/authorize.js'; 

const router = express.Router();

// Route to fetch all essays for a user
router.get('/getEssays', authorize, async (req, res) => {
  try {
    const { id } = req.user; // Extract user ID from the JWT token
    const { rows: essays } = await pool.query('SELECT essay FROM essays WHERE user_id = $1', [id]);
    res.json({ essays });
  } catch (err) {
    console.error('Error fetching essays:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
