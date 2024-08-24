import { ReadingService } from '../../services/reading/readingService.js';

const readingService = new ReadingService();

export class ReadingController {
  async createReadingTest(req, res) {
    try {
      const { questionTypes, questionCount } = req.body;
      if (!Array.isArray(questionTypes) || questionTypes.length === 0 || !Number.isInteger(questionCount) || questionCount <= 0) {
        return res.status(400).json({ error: 'Invalid input' });
      }
      const test = await readingService.createReadingTest(questionTypes, questionCount);
      res.json(test);
    } catch (error) {
      console.error('Error creating reading test:', error);
      res.status(500).json({ error: 'An error occurred while creating the reading test', details: error.message });
    }
  }

  async submitReadingTest(req, res) {
    try {
      const { answers } = req.body;
      if (!answers || typeof answers !== 'object') {
        return res.status(400).json({ error: 'Invalid input' });
      }
      const result = await readingService.submitReadingTest(answers);
      res.json(result);
    } catch (error) {
      console.error('Error submitting reading test:', error);
      res.status(500).json({ error: 'An error occurred while submitting the reading test', details: error.message });
    }
  }

  async getReadingQuestions(req, res) {
    try {
      const { type, count } = req.query;
      if (!type || !count || !Number.isInteger(Number(count))) {
        return res.status(400).json({ error: 'Invalid input' });
      }
      const questions = await readingService.getQuestions(type, Number(count));
      res.json(questions);
    } catch (error) {
      console.error('Error getting reading questions:', error);
      res.status(500).json({ error: 'An error occurred while fetching reading questions', details: error.message });
    }
  }

  async getQuestionDetails(req, res) {
    try {
      const { questionId } = req.params;
      if (!questionId) {
        return res.status(400).json({ error: 'Invalid input' });
      }
      const questionDetails = await readingService.getQuestionDetails(Number(questionId));
      res.json(questionDetails);
    } catch (error) {
      console.error('Error getting question details:', error);
      if (error.message === 'Question not found') {
        res.status(404).json({ error: 'Question not found' });
      } else {
        res.status(500).json({ error: 'An error occurred while fetching question details', details: error.message });
      }
    }
  }
}