import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

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

// Logging middleware to debug requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

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

// Serve the frontend's index.html for all other routes in production
app.get('*', (req, res) => {
  if (req.url.startsWith('/static') || req.url.endsWith('.js') || req.url.endsWith('.css') || req.url.endsWith('.map')) {
    res.sendFile(path.join(__dirname, '../../frontend/dist', req.url));
  } else {
    res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
  }
});

// Start the server

const PORT = process.env.PORT || 0; // Use Heroku's port or default to 0 for local development

const server = app.listen(PORT, () => {
  const allocatedPort = server.address().port;
  console.log(`Server running on port ${allocatedPort}`);
  process.env.ALLOCATED_PORT = allocatedPort;
});

// Endpoint to get the allocated port (for local development)
if (process.env.NODE_ENV !== 'production') {
  app.get('/port', (req, res) => {
    res.json({ port: process.env.ALLOCATED_PORT });
  });
}