import express from 'express';
import pool from '../db.js'; // Ensure this path is correct for your setup

const router = express.Router();

router.get('/random-questions', async (req, res) => {
  try {
    const part1 = await pool.query('SELECT * FROM speaking_prompts WHERE part_id = 1 ORDER BY RANDOM() LIMIT 2');
    const part2 = await pool.query('SELECT * FROM speaking_prompts WHERE part_id = 2 ORDER BY RANDOM() LIMIT 2');
    const part3 = await pool.query('SELECT * FROM speaking_prompts WHERE part_id = 3 ORDER BY RANDOM() LIMIT 2');
    res.json({ part1: part1.rows, part2: part2.rows, part3: part3.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/selected-questions', async (req, res) => {
    const { part1, part2, part3 } = req.body;
  
    try {
      const selectedPart1 = await pool.query('SELECT * FROM speaking_prompts WHERE part_id = 1 AND topic = ANY($1)', [part1]);
      const selectedPart2 = await pool.query('SELECT * FROM speaking_prompts WHERE part_id = 2 AND topic = ANY($1)', [part2]);
      const selectedPart3 = await pool.query('SELECT * FROM speaking_prompts WHERE part_id = 3 AND topic = ANY($1)', [part3]);
      res.json({ part1: selectedPart1.rows, part2: selectedPart2.rows, part3: selectedPart3.rows });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  
  export default router;