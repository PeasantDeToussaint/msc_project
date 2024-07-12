import express from 'express';
import multer from 'multer';
import { SpeechClient } from '@google-cloud/speech';
import fs from 'fs';
import util from 'util';
import path from 'path';
import wavFileInfo from 'wav-file-info'; // Import wav-file-info

// Set the environment variable for Google Cloud credentials
process.env.GOOGLE_APPLICATION_CREDENTIALS = "/Users/yuanlin/project-yasiman-613ea398e412.json";

const upload = multer({ dest: 'uploads/' });
const speechClient = new SpeechClient();
const router = express.Router();

router.post('/process-audio', upload.single('audio'), async (req, res) => {
  const filePath = req.file.path;
  const readFile = util.promisify(fs.readFile);
  const wavFileInfoAsync = util.promisify(wavFileInfo.infoByFilename); // Promisify wav-file-info

  // Validate file extension
  const fileExtension = path.extname(req.file.originalname).toLowerCase();
  if (fileExtension !== '.wav') {
    res.status(400).send('Unsupported file format. Please upload a WAV file.');
    fs.unlink(filePath, (err) => {
      if (err) console.error('Failed to delete file:', err);
    });
    return;
  }

  try {
    // Get WAV file info to read the sample rate
    const wavInfo = await wavFileInfoAsync(filePath);
    const sampleRate = wavInfo.sample_rate;

    const audioContent = await readFile(filePath);
    const audioBytes = audioContent.toString('base64');

    const request = {
      audio: {
        content: audioBytes,
      },
      config: {
        encoding: 'LINEAR16',
        sampleRateHertz: sampleRate,
        languageCode: 'en-US',
      },
    };

    const [response] = await speechClient.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');

    res.json({ transcription });
  } catch (error) {
    console.error('Error processing audio:', error);
    res.status(500).send(`Error processing audio: ${error.message}`);
  } finally {
    fs.unlink(filePath, (err) => {
      if (err) console.error('Failed to delete file:', err);
    });
  }
});

export default router;
