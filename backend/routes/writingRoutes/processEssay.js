import { Router } from 'express';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../../db.js';
import authorize from '../../middleware/authorize.js';
import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const promptFilePath = path.resolve(__dirname, '../../utils', 'instruction_task2.txt');
const promptContent = fs.readFileSync(promptFilePath, 'utf-8');

router.post('/processEssay', authorize, async (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ message: 'Authorization header is missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.user.id;

    const { prompt, response } = req.body;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: promptContent },
        { role: 'user', content: `Question: ${prompt}\nEssay: ${response}\n` },
      ],
      n: 1,
    });

    const text = completion.choices[0].message.content;
    const feedback = parseFeedback(text);

    const query = `
      INSERT INTO essays (user_id, prompt, essay, overall_score)
      VALUES ($1, $2, $3, $4) RETURNING id
    `;
    const values = [userId, prompt, response, feedback.overallScore];
    const result = await pool.query(query, values);

    res.json(feedback);
  } catch (error) {
    console.error('Error processing essay:', error);
    res.status(500).json({ error: 'Error occurred while processing the essay' });
  }
});

router.post('/elaborateFeedback', authorize, async (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ message: 'Authorization header is missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const { prompt, response, section, currentFeedback } = req.body;

    const elaborationPrompt = `You are an IELTS Writing Task 2 expert. You've been given a student's essay and initial feedback for a specific section. Your task is to provide a more detailed explanation of the feedback and offer specific suggestions for improvement.

Question: ${prompt}

Student's Essay: ${response}

Section: ${section}
Initial Feedback: ${currentFeedback}

Please provide:
1. A more detailed explanation of the strengths and weaknesses in this section.
2. Specific examples from the essay that illustrate these points.
3. Actionable suggestions for improvement, including example phrases or structures the student could use.
4. A brief exercise or practice task that would help the student improve in this area.

Your elaboration should be thorough but concise, aiming for about 200-250 words.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an IELTS Writing Task 2 expert providing detailed feedback.' },
        { role: 'user', content: elaborationPrompt },
      ],
      n: 1,
    });

    const elaboration = completion.choices[0].message.content;

    // Directly return the elaboration without storing it in the database
    res.json({ elaboration });
  } catch (error) {
    console.error('Error elaborating feedback:', error);
    if (error.response) {
      console.error('API response:', error.response.data);
      res.status(500).json({ error: 'Error occurred while elaborating feedback', details: error.response.data });
    } else {
      res.status(500).json({ error: 'Error occurred while elaborating feedback' });
    }
  }
});


function parseFeedback(text) {
  const feedback = {
    overallScore: 'N/A',
    taskResponse: { score: 'N/A', text: 'No feedback available' },
    coherence: { score: 'N/A', text: 'No feedback available' },
    lexical: { score: 'N/A', text: 'No feedback available' },
    grammar: { score: 'N/A', text: 'No feedback available' },
  };

  const sections = text.split('\n\n');
  sections.forEach(section => {
    if (section.startsWith('Overall-Score:')) {
      feedback.overallScore = extractScore(section);
    } else if (section.startsWith('Task-Response-Score:')) {
      feedback.taskResponse.score = extractScore(section);
      feedback.taskResponse.text = extractFeedbackText(section, 'Task-Response-Feedback:');
    } else if (section.startsWith('Coherence-and-Cohesion-Score:')) {
      feedback.coherence.score = extractScore(section);
      feedback.coherence.text = extractFeedbackText(section, 'Coherence-and-Cohesion-Feedback:');
    } else if (section.startsWith('Lexical-Resource-Score:')) {
      feedback.lexical.score = extractScore(section);
      feedback.lexical.text = extractFeedbackText(section, 'Lexical-Resource-Feedback:');
    } else if (section.startsWith('Grammatical-Range-and-Accuracy-Score:')) {
      feedback.grammar.score = extractScore(section);
      feedback.grammar.text = extractFeedbackText(section, 'Grammatical-Range-and-Accuracy-Feedback:');
    }
  });

  return feedback;
}

function extractScore(section) {
  const match = section.match(/:\s*([0-9.]+)/);
  return match ? match[1] : 'N/A';
}

function extractFeedbackText(section, feedbackLabel) {
  const match = section.match(new RegExp(`${feedbackLabel}\\s*(.*)`, 's'));
  return match ? match[1].trim() : 'No feedback available';
}

export default router;