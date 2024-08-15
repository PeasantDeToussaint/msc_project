import { Router } from 'express';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __filename and __dirname for ESM compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the router
const router = Router();

// Initialize the OpenAI client with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Resolve the path to the instruction file and read its content
const promptFilePath = path.resolve(__dirname, '../utils', 'instruction_task2.txt');
const promptContent = fs.readFileSync(promptFilePath, 'utf-8');

// Define the POST route for processing the essay
router.post('/processEssay', async (req, res) => {
  const { prompt, response } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: promptContent },
        { role: 'user', content: `Question: ${prompt}\nEssay: ${response}\n` },
      ],
      n: 1,
    });

    const text = completion.choices[0].message.content;
    console.log('Raw received text:', text);

    // Parse the feedback text
    const feedback = parseFeedback(text);

    // Send the final JSON response including the overall score
    res.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Error occurred' });
  }
});

// Helper function to parse the feedback text
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

// Helper functions to extract scores and feedback text
function extractScore(section) {
  const match = section.match(/:\s*([0-9.]+)/);
  return match ? match[1] : 'N/A';
}

function extractFeedbackText(section, feedbackLabel) {
  const match = section.match(new RegExp(`${feedbackLabel}\\s*(.*)`, 's'));
  return match ? match[1].trim() : 'No feedback available';
}

export default router;