import express from 'express';
import pool from '../db.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/task1_images';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Get all writing task 1 prompts
router.get('/prompts', async (req, res) => {
  try { 
    const result = await pool.query('SELECT * FROM writing_task1_prompts');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a new writing task 1 prompt
router.post('/prompts', upload.single('image'), async (req, res) => {
  const { category, question, time_limit } = req.body;
  const imageUrl = req.file ? `task1_images/${req.file.filename}` : null;

  try {
    const result = await pool.query(
      'INSERT INTO writing_task1_prompts (category, question, time_limit, image_url) VALUES ($1, $2, $3, $4) RETURNING id',
      [category, question, time_limit, imageUrl]
    );
    res.status(201).json({ message: 'Writing prompt added', id: result.rows[0].id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a writing task 1 prompt
router.put('/prompts/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { category, question, time_limit } = req.body;
  const imageUrl = req.file ? `task1_images/${req.file.filename}` : null;

  try {
    if (imageUrl) {
      const result = await pool.query('SELECT image_url FROM writing_task1_prompts WHERE id = $1', [id]);
      const oldImage = result.rows[0].image_url;
      if (oldImage && fs.existsSync(path.join(__dirname, '..', oldImage))) {
        fs.unlinkSync(path.join(__dirname, '..', oldImage));
      }
      await pool.query(
        'UPDATE writing_task1_prompts SET category = $1, question = $2, time_limit = $3, image_url = $4 WHERE id = $5',
        [category, question, time_limit, imageUrl, id]
      );
    } else {
      await pool.query(
        'UPDATE writing_task1_prompts SET category = $1, question = $2, time_limit = $3 WHERE id = $4',
        [category, question, time_limit, id]
      );
    }
    res.json({ message: 'Writing prompt updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a writing task 1 prompt
router.delete('/prompts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch the file name from the database
    const result = await pool.query('SELECT image_url FROM writing_task1_prompts WHERE id = $1', [id]);
    const imageUrl = result.rows[0].image_url;

    if (imageUrl) {
      const imagePath = path.join(__dirname, '..', 'uploads', imageUrl);
      console.log(`Attempting to delete file at path: ${imagePath}`);

      // Check if the file exists and delete it
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log('Image file deleted successfully');
      } else {
        console.error('File does not exist:', imagePath);
      }
    }

    // Delete the database record
    await pool.query('DELETE FROM writing_task1_prompts WHERE id = $1', [id]);
    res.json({ message: 'Writing prompt deleted' });
  } catch (err) {
    console.error('Error during DELETE request:', err.message);
    res.status(500).send('Server error');
  }
});




export default router;
