import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import speakingQuestions from '../routes/speakingQuestions.js';
import jwtAuth from '../routes/jwtAuth.js';
import processAudio from '../routes/processAudio.js';
import writingTask2Questions from '../routes/writingTask2Questions.js';
import writingTask1Questions from '../routes/writingTask1Questions.js';
import processEssay from '../routes/processEssay.js';
import adminRoutes from '../routes/adminRoutes.js';
import processEssayTask1 from '../routes/processEssayTask1.js';
import processTranscription from '../routes/processTranscription.js';
import UserData from '../routes/userData.js';
import advancedVocabularyAnalysis from '../routes/vocabRoutes/advancedVocabularyAnalysis.js';
import lexicalDensity from '../routes/vocabRoutes/lexicalDensity.js';
import repeatedWords from '../routes/vocabRoutes/repeatedWords.js';
import rareWords from '../routes/vocabRoutes/rareWords.js';
import misSpellings from '../routes/vocabRoutes/misSpellings.js';
import getEssays from '../routes/getEssays.js';



dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Resolve the directory name dynamically
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Logging middleware to debug requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.post('/test', (req, res) => {
  console.log('Test route received:', req.body);
  res.send('Test route is working!');
});

app.get('/', (req, res) => {
  res.send('This is the backend page of my project.');
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
app.use('/getEssays', getEssays);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});