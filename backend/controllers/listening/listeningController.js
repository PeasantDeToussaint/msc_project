import pool from '../../db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAvailableTestIds = async (req, res) => {
  try {
    const query = 'SELECT DISTINCT audio_recording_id FROM listening_questions ORDER BY audio_recording_id';
    const { rows } = await pool.query(query);
    
    const testIds = rows.map(row => row.audio_recording_id);
    res.json(testIds);
  } catch (error) {
    console.error('Error fetching available test IDs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getListeningTest = async (req, res) => {
  const { testId } = req.params;
  try {
    const audioQuery = 'SELECT * FROM audio_recordings WHERE id = $1';
    const questionsQuery = `
      SELECT lq.*, li.image_path
      FROM listening_questions lq
      LEFT JOIN listening_images li ON lq.audio_recording_id = li.audio_recording_id AND lq.section = li.section
      WHERE lq.audio_recording_id = $1 
      ORDER BY lq.section, lq.order_num
    `;
    
    const [audioResult, questionsResult] = await Promise.all([
      pool.query(audioQuery, [testId]),
      pool.query(questionsQuery, [testId])
    ]);

    if (audioResult.rows.length === 0) {
      return res.status(404).json({ message: 'Test not found' });
    }

    const testData = {
      audio: audioResult.rows[0],
      questions: questionsResult.rows.map(question => ({
        ...question,
        image_url: question.image_path ? `/listeningQuestions/image/${question.audio_recording_id}/${question.section}` : null
      }))
    };

    res.json(testData);
  } catch (error) {
    console.error('Error fetching test data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getListeningImage = async (req, res) => {
  const { audioRecordingId, section } = req.params;
  try {
    const query = 'SELECT image_path FROM listening_images WHERE audio_recording_id = $1 AND section = $2';
    const { rows } = await pool.query(query, [audioRecordingId, section]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Image not found in database' });
    }

    // Remove the extra 'backend' from the path if it exists
    const dbImagePath = rows[0].image_path.replace(/^backend\//, '');
    
    // Construct the full path
    const imagePath = path.join(__dirname, '..', '..', dbImagePath);

    // Check if the file exists
    try {
      await fs.access(imagePath);
    } catch (error) {
      console.error('File does not exist:', imagePath);
      return res.status(404).json({ message: 'Image file not found on server' });
    }

    // Log the full path for debugging
    console.log('Attempting to send file:', imagePath);

    res.sendFile(imagePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).json({ message: 'Error sending image file', error: err.message });
      }
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getListeningAudio = async (req, res) => {
  const { audioRecordingId } = req.params;
  try {
    const query = 'SELECT file_path FROM audio_recordings WHERE id = $1';
    const { rows } = await pool.query(query, [audioRecordingId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Audio not found in database' });
    }

    // Remove the extra 'backend' from the path if it exists
    const dbAudioPath = rows[0].file_path.replace(/^backend\//, '');
    
    // Construct the full path
    const audioPath = path.join(__dirname, '..', '..', dbAudioPath);

    // Check if the file exists
    try {
      await fs.access(audioPath);
    } catch (error) {
      console.error('File does not exist:', audioPath);
      return res.status(404).json({ message: 'Audio file not found on server' });
    }

    // Log the full path for debugging
    console.log('Attempting to send file:', audioPath);

    res.sendFile(audioPath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).json({ message: 'Error sending audio file', error: err.message });
      }
    });
  } catch (error) {
    console.error('Error fetching audio:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const submitListeningTest = async (req, res) => {
  const { testId } = req.params;
  const { userAnswers } = req.body;
  
  try {
    const query = 'SELECT id, data FROM listening_questions WHERE audio_recording_id = $1';
    const { rows } = await pool.query(query, [testId]);

    let score = 0;
    rows.forEach(question => {
      const data = JSON.parse(question.data);
      if (userAnswers[question.id]?.toLowerCase() === data.correct_answer.toLowerCase()) {
        score++;
      }
    });

    res.json({ score, totalQuestions: rows.length });
  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};