import express from 'express';
import stopword from 'stopword';
import axios from 'axios';
import authorize from '../../middleware/authorize.js';

const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.ALLOCATED_PORT}`;

const router = express.Router();

// Simplified tokenization function
const tokenizeText = (text) => {
    return text
        .toLowerCase() // Convert to lowercase
        .replace(/[^\w\s]/g, '') // Remove punctuation
        .split(/\s+/); // Split by spaces (whitespace)
};

// Function to extract common words
const extractCommonWords = (essays) => {
    let combinedText;
    if (typeof essays === 'string') {
        combinedText = essays;
    } else if (Array.isArray(essays)) {
        combinedText = essays.join(' ');
    } else {
        throw new Error('Invalid input: essays should be a string or an array of strings.');
    }

    // Tokenize the text
    let tokens = tokenizeText(combinedText);

    // Remove stopwords
    tokens = stopword.removeStopwords(tokens);

    // Create a frequency distribution
    const wordFrequency = {};
    tokens.forEach(word => {
        if (wordFrequency[word]) {
            wordFrequency[word] += 1;
        } else {
            wordFrequency[word] = 1;
        }
    });

    // Convert to array and sort by frequency
    const sortedWords = Object.entries(wordFrequency).sort((a, b) => b[1] - a[1]);

    // Get the top 100 most common words
    const topWords = sortedWords.slice(0, 100);

    // Format the results
    const results = topWords.map(([word, frequency]) => ({
        word,
        occurrences: frequency
    }));

    return results;
};

// Function to fetch essays
const fetchEssays = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/getEssays/getEssays`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data.essays.map(e => e.essay);
    } catch (error) {
        console.error('Error fetching essays:', error.message);
        throw new Error('Could not retrieve essays.');
    }
};

// Route to handle essay analysis for repeated words
router.get('/repeatedWords', authorize, async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send('Authorization token is required');
    }

    try {
        const essays = await fetchEssays(token);

        // Extract common words
        const commonWords = extractCommonWords(essays);

        res.json({ commonWords });
    } catch (err) {
        console.error('Error processing essays:', err.message);
        res.status(500).send('Server error');
    }
});

export default router;