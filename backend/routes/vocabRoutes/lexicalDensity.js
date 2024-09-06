import express from 'express';
import axios from 'axios';
import authorize from '../../middleware/authorize.js';

const router = express.Router();
const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.ALLOCATED_PORT}`;

// Simplified tokenization function
const tokenizeText = (text) => {
    return text
        .toLowerCase() // Convert to lowercase
        .replace(/[^\w\s]/g, '') // Remove punctuation
        .split(/\s+/); // Split by spaces (whitespace)
};

// Function to classify words as content or function words (without POS tagging)
const isContentWord = (word) => {
    const contentWords = [
        'NN', 'NNS', 'NNP', 'NNPS',  // Nouns
        'VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ',  // Verbs
        'JJ', 'JJR', 'JJS',  // Adjectives
        'RB', 'RBR', 'RBS'   // Adverbs
    ];
    // You can add rules or use a basic approximation (e.g., length-based or common function word lists)
    return word.length > 3;  // Simplified assumption: content words tend to be longer than 3 characters
};

// Function to calculate Lexical Density
const calculateLexicalDensity = (essaysText) => {
    // Tokenize the text
    const tokens = tokenizeText(essaysText);

    // Count unique words
    const uniqueWords = new Set(tokens).size;

    // Count total words and content words
    const totalWords = tokens.length;
    const contentWords = tokens.filter(isContentWord).length;

    // Calculate Lexical Density
    const lexicalDensity = ((contentWords / totalWords) * 100).toFixed(2);

    return {
        lexicalDensity,
        totalWords,
        uniqueWords,
        contentWords,
    };
};

// Route to handle Lexical Density calculation
router.get('/lexicalDensity', authorize, async (req, res) => {
    try {
        const headers = {
            'Authorization': req.header('Authorization')
        };

        // Fetch essays from another service
        const response = await axios.get(`${BASE_URL}/getEssays/getEssays`, { headers });

        if (!response.data.essays || response.data.essays.length === 0) {
            return res.status(404).json({ msg: 'No essays found for this user' });
        }

        // Combine all essay texts into one string, trimming and filtering out empty or undefined ones
        const essaysText = response.data.essays
            .map(essay => essay.essay && essay.essay.trim())
            .filter(text => text && text.length > 0)
            .join(' ');

        if (!essaysText || essaysText.length === 0) {
            return res.status(404).json({ msg: 'No valid essays found for this user' });
        }

        // Calculate Lexical Density
        const result = calculateLexicalDensity(essaysText);
        
        res.json(result);
    } catch (err) {
        console.error('Error in /lexicalDensity route:', {
            message: err.message,
            stack: err.stack,
            headers: req.headers,
        });
        res.status(500).json({ msg: 'Server error' });
    }
});

export default router;
