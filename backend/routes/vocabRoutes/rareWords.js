import express from 'express';
import fs from 'fs';
import axios from 'axios';
import { commonWords } from '../../utils/2000MostCommonEnglishWords.js';
import wordListPath from 'word-list';
import authorize from '../../middleware/authorize.js';
import WordPOS from 'wordpos'; // Import the wordpos package

const router = express.Router();
const wordpos = new WordPOS(); // Initialize WordPOS
const englishWords = new Set(fs.readFileSync(wordListPath, 'utf8').split('\n'));

// Create a Set for faster lookup of common words
const commonWordsSet = new Set(Object.keys(commonWords).concat(Object.values(commonWords).flat()));

router.get('/rareWords', authorize, async (req, res) => {
    try {
        const headers = {
            'Authorization': req.header('Authorization')
        };

        // Fetch essays from another service
        const response = await axios.get('http://localhost:3000/getEssays/getEssays', { headers });

        if (!response.data.essays || response.data.essays.length === 0) {
            return res.status(404).json({ msg: 'No essays found for this user' });
        }

        // Combine all essay texts into one string, trimming and filtering out empty or undefined ones
        const essaysText = response.data.essays
            .map(essay => essay.essay && essay.essay.trim())
            .filter(text => text && text.length > 0)
            .join(' ');

        // Split the text into words using a robust regex for word boundaries
        const words = essaysText.split(/\s+/);

        // Lemmatize each word and then filter out common words
        const lemmatizedWords = await Promise.all(words.map(async word => {
            const lowerCaseWord = word.toLowerCase();
            const results = await wordpos.lookup(lowerCaseWord); // Use lookup to get word information
            return results.length > 0 ? results[0].lemma : lowerCaseWord; // Default to the word if no lemma is found
        }));

        // Filter out common words and identify rare words
        const rareWords = lemmatizedWords.filter(lemma => {
            return englishWords.has(lemma) && !commonWordsSet.has(lemma);
        });

        res.json({
            rareWords: Array.from(new Set(rareWords)) // Remove duplicates
        });
    } catch (err) {
        console.error('Error processing essays:', {
            message: err.message,
            stack: err.stack,
            headers: req.headers,
        });
        res.status(500).json({ msg: 'Server error' });
    }
});

export default router;
