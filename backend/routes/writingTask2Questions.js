import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Fetch a random writing prompt
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

// Fetch a random writing prompt from selected categories
router.post('/selected-question', async (req, res) => {
  const { categories } = req.body;
  try {
    const selectedPrompt = await pool.query(
      'SELECT * FROM writing_task2_prompts WHERE category ILIKE ANY($1::text[]) ORDER BY RANDOM() LIMIT 1',
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

// Get all writing task 2 prompts
router.get('/prompts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM writing_task2_prompts');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a new writing task 2 prompt
router.post('/prompts', async (req, res) => {
  const { category, question, time_limit } = req.body;
  try {
    await pool.query(
      'INSERT INTO writing_task2_prompts (category, question, time_limit) VALUES ($1, $2, $3)',
      [category, question, time_limit]
    );
    res.status(201).json({ message: 'Writing prompt added' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a writing task 2 prompt
router.put('/prompts/:id', async (req, res) => {
  const { id } = req.params;
  const { category, question, time_limit } = req.body;
  try {
    await pool.query(
      'UPDATE writing_task2_prompts SET category = $1, question = $2, time_limit = $3 WHERE id = $4',
      [category, question, time_limit, id]
    );
    res.json({ message: 'Writing prompt updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a writing task 2 prompt
router.delete('/prompts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM writing_task2_prompts WHERE id = $1', [id]);
    res.json({ message: 'Writing prompt deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;