import express from 'express';
import natural from 'natural';
import axios from 'axios';
import authorize from '../../middleware/authorize.js';

const router = express.Router();

// Load the POS Tagger components
const baseFolder = "node_modules/natural/lib/natural/brill_pos_tagger";
const rulesFilename = `${baseFolder}/data/English/tr_from_posjs.txt`;
const lexiconFilename = `${baseFolder}/data/English/lexicon_from_posjs.json`;

const lexicon = new natural.Lexicon(lexiconFilename, 'NN'); // 'NN' is the default category for unknown words
const rules = new natural.RuleSet(rulesFilename);
const tagger = new natural.BrillPOSTagger(lexicon, rules);
const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.ALLOCATED_PORT}`;


// Function to calculate Lexical Density
const calculateLexicalDensity = (essaysText) => {
    // Tokenize the text
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(essaysText.toLowerCase());
    console.log('Tokens:', tokens); // Debugging

    // Count unique words
    const uniqueWords = new Set(tokens).size;
    console.log('Unique Words:', uniqueWords); // Debugging

    // POS tagging to identify content words
    const taggedWords = tagger.tag(tokens);
    console.log('Tagged Words:', taggedWords.taggedWords); // Debugging

    // Define content word tags (nouns, verbs, adjectives, adverbs)
    const contentTags = [
        'NN', 'NNS', 'NNP', 'NNPS', 
        'VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ', 
        'JJ', 'JJR', 'JJS', 
        'RB', 'RBR', 'RBS'
    ];

    // Count total words and content words
    const totalWords = tokens.length;
    const contentWords = taggedWords.taggedWords.filter(word => contentTags.includes(word.tag)).length;
    console.log('Total Words:', totalWords); // Debugging
    console.log('Content Words:', contentWords); // Debugging

    // Calculate Lexical Density
    const lexicalDensity = ((contentWords / totalWords) * 100).toFixed(2);

    return {
        lexicalDensity,
        totalWords,
        uniqueWords,
        contentWords,
        taggedWords: taggedWords.taggedWords // For debugging
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
