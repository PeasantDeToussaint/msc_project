import { Router } from 'express';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const router = Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const promptFilePath = path.resolve('/Users/yuanlin/msc_project/backend/utils', 'instruction.txt');
const promptContent = fs.readFileSync(promptFilePath, 'utf-8');

router.post('/processEssay', async (req, res) => {
  const { prompt, response } = req.body;

  try {
    const gptResponse = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: promptContent },
          { role: 'user', content: `Question: ${prompt}\nEssay: ${response}\n` },
        ],
    });

    const feedback = gptResponse.choices[0].message.content;
    res.json({ feedback });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Error occurred' });
  }
});

export default router;