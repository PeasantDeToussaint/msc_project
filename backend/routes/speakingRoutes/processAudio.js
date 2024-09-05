import express from 'express';
import { promises as fs } from 'fs';  // Using promises for fs operations
import path from 'path';
import multer from 'multer';
import { SpeechClient } from '@google-cloud/speech';
import util from 'util';
import wavFileInfo from 'wav-file-info';

// Initialize the Google Cloud Speech client using environment variables directly
const speechClient = new SpeechClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Ensure correct formatting
  },
  projectId: process.env.GOOGLE_PROJECT_ID,
});

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/process-audio', upload.single('audio'), async (req, res) => {
  const filePath = req.file.path;
  const fileExtension = path.extname(req.file.originalname).toLowerCase();

  // Validate file extension
  if (fileExtension !== '.wav') {
    await fs.unlink(filePath); // Clean up file if invalid format
    return res.status(400).send('Unsupported file format. Please upload a WAV file.');
  }

  try {
    const fileBuffer = await fs.readFile(filePath);

    // You can now process the file with Google Cloud Speech API
    const wavFileInfoAsync = util.promisify(wavFileInfo.infoByFilename);
    const fileInfo = await wavFileInfoAsync(filePath);

    // Example processing logic (adjust based on your needs)
    const audioBytes = fileBuffer.toString('base64');
    const audio = {
      content: audioBytes,
    };

    const config = {
      encoding: fileInfo.format.encoding,  // Ensure correct encoding
      sampleRateHertz: fileInfo.format.sample_rate,
      languageCode: 'en-US',
    };

    const request = {
      audio: audio,
      config: config,
    };

    // Transcribe the audio using Google Cloud Speech-to-Text API
    const [response] = await speechClient.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');

    // Return the transcription as the response
    res.status(200).send({ transcription });
  } catch (error) {
    console.error('Error processing audio:', error);
    res.status(500).send('Error processing audio file.');
  } finally {
    // Clean up the uploaded file after processing
    await fs.unlink(filePath);
  }
});

export default router;
