
import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/random-question', async (req, res) => {
  try {
    const prompt = await pool.query('SELECT * FROM writing_task2_prompts ORDER BY RANDOM() LIMIT 1');
    if (prompt.rows.length === 0) {
      return res.status(404).json({ error: 'No prompts found' });
    }
    res.json(prompt.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.post('/selected-question', async (req, res) => {
  const { categories } = req.body;

  try {
    const selectedPrompt = await pool.query(
      'SELECT * FROM writing_task2_prompts WHERE category = ANY($1::text[]) ORDER BY RANDOM() LIMIT 1',
      [categories]
    );
    if (selectedPrompt.rows.length === 0) {
      return res.status(404).json({ error: 'No prompts found for the specified categories' });
    }
    res.json(selectedPrompt.rows[0]);
  } catch (err) {
    console.error('Error executing query:', err.message);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

export default router;
