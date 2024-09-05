import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables in non-production environments
if (process.env.NODE_ENV !== 'production') {
  const dotenv = await import('dotenv');
  dotenv.config();
}

// Import routes
import speakingQuestions from '../routes/speakingRoutes/speakingQuestions.js';
import jwtAuth from '../routes/adminRoutes/jwtAuth.js';
import processAudio from '../routes/speakingRoutes/processAudio.js';
import writingTask2Questions from '../routes/writingRoutes/writingTask2Questions.js';
import writingTask1Questions from '../routes/writingRoutes/writingTask1Questions.js';
import processEssay from '../routes/writingRoutes/processEssay.js';
import adminRoutes from '../routes/adminRoutes/adminRoutes.js';
import processEssayTask1 from '../routes/writingRoutes/processEssayTask1.js';
import processTranscription from '../routes/speakingRoutes/processTranscription.js';
import UserData from '../routes/adminRoutes/userData.js';
import advancedVocabularyAnalysis from '../routes/vocabRoutes/advancedVocabularyAnalysis.js';
import lexicalDensity from '../routes/vocabRoutes/lexicalDensity.js';
import repeatedWords from '../routes/vocabRoutes/repeatedWords.js';
import rareWords from '../routes/vocabRoutes/rareWords.js';
import misSpellings from '../routes/vocabRoutes/misSpellings.js';
import getEssays from '../routes/adminRoutes/getEssays.js';
import listeningQuestions from '../routes/listeningRoutes/listeningQuestions.js';
import readingQuestions from '../routes/readingRoutes/readingQuestions.js';

const app = express();

// Resolve the directory name dynamically
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Serve static files from the 'frontend/dist' directory in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
}

// Conditional logging for development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// Test route for debugging purposes
app.post('/test', (req, res) => {
  console.log('Test route received:', req.body);
  res.send('Test route is working!');
});

// Use routes
app.use('/authentication', jwtAuth);
app.use('/speakingQuestions', speakingQuestions);
app.use('/audio', processAudio);
app.use('/writingTask2Questions', writingTask2Questions);
app.use('/essay', processEssay);
app.use('/essayTask1', processEssayTask1);
app.use('/admin', adminRoutes);
app.use('/writingTask1Questions', writingTask1Questions);
app.use('/transcription', processTranscription);
app.use('/userdata', UserData);
app.use('/misSpellings', misSpellings);
app.use('/rareWords', rareWords);
app.use('/advancedVocabulary', advancedVocabularyAnalysis);
app.use('/lexicalDensity', lexicalDensity);
app.use('/repeatedWords', repeatedWords);
app.use('/readingQuestions', readingQuestions);
app.use('/getEssays', getEssays);
app.use('/listeningQuestions', listeningQuestions);

// Serve frontend's index.html for all other routes in production
app.get('*', (req, res) => {
  if (req.url.startsWith('/static') || req.url.endsWith('.js') || req.url.endsWith('.css') || req.url.endsWith('.map')) {
    res.sendFile(path.join(__dirname, '../../frontend/dist', req.url));
  } else {
    res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
  }
});

// Start the server
const PORT = process.env.PORT || 5000; // Use Heroku's port in production or default to 5000 for local development
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

