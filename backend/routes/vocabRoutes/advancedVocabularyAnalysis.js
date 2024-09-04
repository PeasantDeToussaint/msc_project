import express from 'express';
import natural from 'natural';
import axios from 'axios';
import authorize from '../../middleware/authorize.js';

const router = express.Router();
const wordNet = new natural.WordNet();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const advancedVocabulary = [
    "advantage", "benefit", "merit", "positive side", "upside", "boon", "pros",
    "disadvantage", "defect", "demerit", "negative side", "downside", "flaw", "drawback", "cons",
    "trend", "tendency", "inclination",
    "stress", "pressure", "strain",
    "evidence", "proof",
    "conflict", "shock", "tension",
    "influence", "impact", "pervade",
    "difference", "distinction", "gap",
    "measure", "step", "action",
    "awareness", "consciousness",
    "essential", "significant", "vital", "crucial", "critical", "fundamental", "indispensable",
    "justified", "sensible", "feasible", "convincing", "persuasive", "rational", "practicable",
    "logical", "wise", "sagacious", "viable", "preferable", "advisable", "appropriate", "bear much analysis",
    "beneficial", "conducive", "instrumental",
    "detrimental", "harmful", "virulent",
    "controversial", "disputable", "contentious",
    "be absorbed in", "be immersed in", "devote oneself to",
    "considerate", "understanding", "sympathetic",
    "acquisitive", "money-oriented", "materialistic",
    "self-centered", "selfish", "inconsiderate",
    "indifferent", "apathetic", "aloof",
    "wasteful", "luxurious", "extravagant",
    "inhumane", "brutal", "barbaric",
    "hopeless", "despairing", "desperate",
    "excessive", "extravagant", "exorbitant",
    "intense", "fierce", "vigorous",
    "stringent", "rigorous", "rigid",
    "unbelievable", "incredulous", "virtual",
    "foreign", "alien", "exotic",
    "extraordinary", "marvelous", "spectacular",
    "ambitious", "aggressive", "aspirant",
    "inherent", "nature", "innate",
    "steady", "stable", "constant",
    "adequate", "enough", "sufficient",
    "widespread", "prevalent", "universal",
    "evident", "apparent", "manifest",
    "be related to", "be associated with", "be linked to",
    "considerably", "significantly", "remarkably", "dramatically", "tremendously", "substantially",
    "approximately", "nearly", "around", "estimated", "roughly",
    "undoubtedly", "indeed", "undeniably", "there is no denying that",
    "be likely to", "potentially", "presumably",
    "claim", "contend", "deem", "reckon", "assert", "share the belief that",
    "advocate", "maintain", "vote for", "side with", "be in favor of",
    "contradict", "criticize", "be against", "cast doubts on",
    "enhance", "strengthen", "boost",
    "decline", "descend", "collapse", "relieve",
    "bring about", "result in", "lead to",
    "create", "spark", "yield", "give rise to",
    "establish", "found", "institute",
    "call for", "request", "demand",
    "eliminate", "remove", "eradicate",
    "explore", "examine", "identify",
    "indicate", "depict", "portray", "illustrate",
    "tackle", "resolve", "address",
    "curb", "regulate", "censor",
    "account for", "be responsible for", "be attributed to",
    "finance", "invest in", "subsidize",
    "relieve", "ease", "alleviate",
    "observe", "follow", "conform to",
    "inherit", "hand down", "carry forward",
    "cultivate", "train", "foster",
    "promote", "contribute to", "upgrade",
    "adapt to", "adjust to", "acclimate to",
    "provide", "render", "afford",
    "replace", "substitute", "take the place of",
    "preserve", "protect", "safeguard",
    "gain", "acquire", "attain",
    "attach importance to", "emphasis", "highlight",
    "advance", "development", "progress",
    "tend to", "be inclined to", "be apt to",
    "attract", "allure", "tempt",
    "achieve", "fulfill", "implement",
    "endanger", "threaten", "jeopardize",
    "undermine", "impair", "damage",
    "hinder", "obstruct", "impede",
    "forbid", "ban", "prohibit",
    "blame", "denounce", "criticize",
    "pollute", "contaminate", "stain",
    "erode", "wear away", "corrode",
    "deceive", "cheat", "defraud",
    "prompt", "spur", "incite",
    "worsen", "aggravate", "deteriorate",
    "exaggerate", "overstate",
    "restrain", "constrain", "confine",
    "tear down", "knock down", "pull down",
    "accelerate", "speed up", "precipitate",
    "predominate", "dominate",
    "distinguish", "differentiate", "discern",
    "counteract", "offset", "cancel out",
    "launch", "conduct", "carry out",
    "assume", "shoulder", "accept",
    "enact", "enforce", "promulgate", "map out",
    "communicate", "exchange", "associate",
    "have access to", "make contact with", "keep in touch with",
    "predict", "expect", "project",
    "give priority to", "put into first place",
    "economize", "conserve", "cherish",
    "be faced with", "be confronted with",
    "beware", "prevent", "guard against",
    "meet the need of", "satisfy the requirement of", "cater for the demand of"
];

const fetchEssays = async (token) => {
    try {
        const response = await axios.get('http://localhost:3000/getEssays/getEssays', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data.essays.map(e => e.essay);
    } catch (error) {
        console.error('Error fetching essays:', error.message);
        throw new Error('Could not retrieve essays.');
    }
};

const fetchDefinitionFromWordNet = async (word) => {
    return new Promise((resolve, reject) => {
        wordNet.lookup(word, (results) => {
            if (results && results.length > 0) {
                resolve(results[0].gloss);
            } else {
                resolve('Definition not found');
            }
        });
    });
};

const generateSampleUsageFromOpenAI = async (word, definition) => {
    const prompt = `Create a meaningful sentence using the word "${word}" based on the definition: "${definition}".`;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'user', content: prompt },
                ],
                max_tokens: 100,
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error(`Error generating sentence for ${word} using OpenAI:`, error.message);
        return `Unable to generate example usage for ${word}. Please try again later.`;
    }
};

const analyzeAdvancedVocabulary = async (essays) => {
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(essays.join(' ').toLowerCase());

    let advancedWordsUsed = {};

    for (const word of tokens) {
        if (advancedVocabulary.includes(word)) {
            if (advancedWordsUsed[word]) {
                advancedWordsUsed[word].count += 1;
            } else {
                const definition = await fetchDefinitionFromWordNet(word);
                advancedWordsUsed[word] = { 
                    count: 1, 
                    definition 
                };
            }
        }
    }

    return advancedWordsUsed;
};

const getRandomAdvancedWordsWithUsage = async (usedWords) => {
    const unusedWords = advancedVocabulary.filter(word => !usedWords.includes(word));
    const randomWords = [];
    
    while (randomWords.length < 10 && unusedWords.length > 0) {
        const randomIndex = Math.floor(Math.random() * unusedWords.length);
        const word = unusedWords.splice(randomIndex, 1)[0];
        const definition = await fetchDefinitionFromWordNet(word);
        const usage = await generateSampleUsageFromOpenAI(word, definition);
        randomWords.push({
            word: word,
            definition: definition,
            usage: usage
        });
    }

    return randomWords;
};

router.get('/advancedVocabulary', authorize, async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send('Authorization token is required');
    }

    try {
        const essays = await fetchEssays(token);
        const advancedWordsUsed = await analyzeAdvancedVocabulary(essays);
        const usedWordsList = Object.keys(advancedWordsUsed);
        const randomAdvancedWords = await getRandomAdvancedWordsWithUsage(usedWordsList);

        res.json({
            advancedWordsUsed: advancedWordsUsed,
            message: `You have used ${usedWordsList.length} advanced words in your writing.`,
            suggestions: randomAdvancedWords
        });
    } catch (err) {
        console.error('Error processing essays:', err.message);
        res.status(500).send('Server error');
    }
});

export default router;
