import express from 'express';
import multer from 'multer';
import { SpeechClient } from '@google-cloud/speech';
import fs from 'fs';
import util from 'util';

// Set the environment variable for Google Cloud credentials
process.env.GOOGLE_APPLICATION_CREDENTIALS = "/Users/yuanlin/project-yasiman-7750592292e4.json";

const upload = multer({ dest: 'uploads/' });
const speechClient = new SpeechClient();

const router = express.Router();

router.post('/process-audio', upload.single('audio'), async (req, res) => {
  const filePath = req.file.path;
  const readFile = util.promisify(fs.readFile);

  try {
    const audioContent = await readFile(filePath);
    const audioBytes = audioContent.toString('base64');

    const request = {
      audio: {
        content: audioBytes,
      },
      config: {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
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
    res.status(500).send('Error processing audio');
  } finally {
    fs.unlink(filePath, (err) => {
      if (err) console.error('Failed to delete file:', err);
    });
  }
});

export default router;
