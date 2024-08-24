import express from 'express';
import { ReadingController } from '../../controllers/reading/readingController.js';

const router = express.Router();
const readingController = new ReadingController();

router.post('/create', readingController.createReadingTest); //create test
router.post('/submit', readingController.submitReadingTest); //
router.get('/questions', readingController.getReadingQuestions);
router.get('/question/:questionId', readingController.getQuestionDetails);

export default router;