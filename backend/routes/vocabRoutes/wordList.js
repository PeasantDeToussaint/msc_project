import express from 'express';
import pool from '../../db.js';

const router = express.Router();


router.get('/wordList/:listId', async (req, res) => {
  const listId = req.params.listId;

  // Validate listId
  if (!listId || isNaN(parseInt(listId))) {
    return res.status(400).json({ error: 'Invalid list ID' });
  }

  try {
    // Query the database for vocabulary items
    const query = `
      SELECT data
      FROM ielts4000vocabulary 
      WHERE list_id = $1
      LIMIT 1
    `;
    const { rows } = await pool.query(query, [listId]);

    // If no rows are returned, send a 404 response
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Vocabulary list not found' });
    }

    // Extract the array of vocabulary items from the data column
    const vocabularyItems = rows[0].data;

    // Validate and filter the vocabulary items
    const validItems = vocabularyItems.filter(item => 
      item.vocabulary && 
      item.definition && 
      typeof item.vocabulary === 'string' && 
      typeof item.definition === 'string'
    );

    if (validItems.length === 0) {
      return res.status(404).json({ error: 'No valid vocabulary items found for the given list ID' });
    }

    // Limit the number of items returned (optional)
    const limitedItems = validItems.slice(0, 100);

    res.json(limitedItems);
  } catch (error) {
    console.error('Error fetching vocabulary list:', error);
    res.status(500).json({ error: 'An error occurred while fetching the vocabulary list' });
  }
});

// New endpoint for fetching fake words
router.get('/fakeWords/:count', async (req, res) => {
  const count = parseInt(req.params.count, 10);

  if (isNaN(count) || count <= 0) {
    return res.status(400).json({ error: 'Invalid count parameter' });
  }

  try {
    const query = 'SELECT word as vocabulary FROM fake_words ORDER BY RANDOM() LIMIT $1';
    const { rows } = await pool.query(query, [count]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No fake words found' });
    }

    // Transform fake words to match the structure of real words
    const fakeWords = rows.map(row => ({
      ...row,
      definition: ""
    }));

    res.json(fakeWords);
  } catch (error) {
    console.error('Error fetching fake words:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;