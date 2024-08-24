import { Router } from 'express';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const task1PromptFilePath = path.resolve(__dirname, '../../utils', 'instruction_task1.txt');
const task1PromptContent = fs.readFileSync(task1PromptFilePath, 'utf-8');

// Configure multer for form data
const upload = multer().fields([
  { name: 'prompt', maxCount: 1 },
  { name: 'response', maxCount: 1 },
  { name: 'image_url', maxCount: 1 }
]);

router.post('/processTask1', upload, async (req, res) => {
  const { prompt, response, image_url } = req.body;

  try {
    const formattedInput = `
      Question: ${prompt}
      Response: ${response}
      Image URL: ${image_url}
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: task1PromptContent },
        { role: 'user', content: formattedInput },
      ],
      n: 1,
    });

    const text = completion.choices[0].message.content;
    console.log('Raw received text:', text);

    const overallScore = extractSection(text, "Overall Score");
    const taskResponse = {
      score: extractSection(text, "Task Response"),
      text: extractFeedback(text, "Task Response"),
    };
    const coherence = {
      score: extractSection(text, "Coherence and Cohesion"),
      text: extractFeedback(text, "Coherence and Cohesion"),
    };
    const lexical = {
      score: extractSection(text, "Lexical Resource"),
      text: extractFeedback(text, "Lexical Resource"),
    };
    const grammar = {
      score: extractSection(text, "Grammatical Range and Accuracy"),
      text: extractFeedback(text, "Grammatical Range and Accuracy"),
    };

    res.json({
      overallScore,
      taskResponse,
      coherence,
      lexical,
      grammar,
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Error occurred' });
  }
});

function extractSection(text, section) {
  const regex = new RegExp(`- ${section}:\\s*([0-9.]+)`, 'i');
  const match = text.match(regex);
  return match ? match[1] : "N/A";
}

function extractFeedback(text, section) {
  const regex = new RegExp(`- ${section}:\\s*[0-9.]+\\s*Feedback:\\s*([^\\n]+)`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : "No feedback available";
}

export default router;