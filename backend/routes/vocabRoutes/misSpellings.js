import express from 'express';
import axios from 'axios';
import authorize from '../../middleware/authorize.js';
import fs from 'fs';
import wordListPath from 'word-list';

const router = express.Router();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Load the word list and convert it to a Set for quick lookups
const wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');
const words = new Set(wordArray);

// Preprocess text to remove punctuation, convert to lowercase, and split into words
function preprocessText(text) {
  text = text.toLowerCase();  // Convert all text to lowercase
  text = text.replace(/[^\w\s]/g, '');  // Remove all punctuation
  return text.split(/\s+/);  // Split text into words by whitespace
}

// Function to get enhanced correction and definition from GPT-4
async function getGPT4Correction(word) {
  const prompt = `The following word might be misspelled: "${word}". Please provide the correct spelling, a brief definition, and a random example sentence.
  Use the following format:
  Correct Spelling: correct_spelling
  Definition: brief_definition
  Example usage: example_sentence`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a spelling corrector and dictionary.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 100, // Increased max tokens to ensure full responses
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const suggestion = response.data.choices[0].message.content.trim();
    return suggestion;
  } catch (error) {
    console.error('Error calling OpenAI API:', error.message);
    return 'No suggestion available';
  }
}

// Function to find and correct all misspelled words using GPT-4, including frequency counting
async function getMisspelledWords(text) {
  const wordsInText = preprocessText(text);
  const wordFrequency = {};  // Object to store word frequencies

  // Track frequency and filter out correctly spelled words
  wordsInText.forEach(word => {
    if (word.length > 1 && isNaN(word) && !words.has(word)) {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    }
  });

  // Get corrections for misspelled words
  const corrections = await Promise.all(Object.keys(wordFrequency).map(async (word) => {
    const enhancedCorrection = await getGPT4Correction(word);
    return {
      word,
      enhancedCorrection,
      frequency: wordFrequency[word],  // Include frequency count
    };
  }));

  return corrections;
}

// GET route to detect and correct misspelled words using GPT-4
router.get('/misSpellings', authorize, async (req, res) => {
  try {
    const headers = {
      'Authorization': req.header('Authorization')
    };

    // Fetch essays for the user from the /getEssays endpoint
    const response = await axios.get('http://localhost:3000/getEssays/getEssays', { headers });

    if (response.data.essays.length === 0) {
      return res.status(404).json({ msg: 'No essays found for this user' });
    }

    const text = response.data.essays.map(e => e.essay).join(' ');
    const misspelledWords = await getMisspelledWords(text);

    res.json({ misspelledWords });
  } catch (err) {
    console.error('Error processing essays:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
