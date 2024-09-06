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

// Fetch synonyms from an external API (Free Dictionary API)
const fetchSynonymsFromAPI = async (word) => {
    try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (response.data.length > 0 && response.data[0].meanings.length > 0) {
            const synonyms = response.data[0].meanings[0].definitions[0].synonyms;
            return synonyms || [];
        }
        return [];
    } catch (error) {
        console.error(`Error fetching synonyms for word "${word}":`, error.message);
        return [];
    }
};

// Function to extract common words and suggest synonyms
const extractCommonWords = async (essays) => {
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

    // Suggest synonyms for the top words
    const results = await Promise.all(
        topWords.map(async ([word, frequency]) => {
            const synonyms = await fetchSynonymsFromAPI(word);

            return {
                word,
                occurrences: frequency,
                suggestions: synonyms.length > 0 ? synonyms.slice(0, 5) : ['No suggestions available'] // Limit to the top 5 synonyms
            };
        })
    );

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

        // Extract common words and suggest synonyms
        const commonWords = await extractCommonWords(essays);

        res.json({ commonWords });
    } catch (err) {
        console.error('Error processing essays:', err.message);
        res.status(500).send('Server error');
    }
});

export default router;
