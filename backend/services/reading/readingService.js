import { ReadingQuestionFactory } from './readingQuestionFactory.js';
import pool from '../../db.js';

export class ReadingService {
  async getQuestions(type, count) {
    const strategy = ReadingQuestionFactory.createQuestionService(type);
    try {
      return await strategy.getQuestions(count);
    } catch (error) {
      console.error(`Error getting questions of type ${type}:`, error);
      throw new Error(`Failed to retrieve questions of type ${type}`);
    }
  }

  async createReadingTest(questionTypes, questionCount) {
    const questions = [];
    for (const type of questionTypes) {
      try {
        const typeQuestions = await this.getQuestions(type, questionCount);
        questions.push(...typeQuestions);
      } catch (error) {
        console.error(`Error getting questions of type ${type}:`, error);
      }
    }
    
    // Shuffle the questions
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }

    return { 
      questions: questions.map(q => ({ 
        id: q.id, 
        type: q.type, 
        title: q.title
      }))
    };
  }

  async submitReadingTest(answers) {
    let totalScore = 0;
    const results = [];

    for (const [questionId, userAnswer] of Object.entries(answers)) {
      const questionResult = await pool.query(
        'SELECT type, data FROM reading_questions WHERE id = $1',
        [questionId]
      );
      
      if (questionResult.rows.length === 0) {
        throw new Error(`Question with id ${questionId} not found`);
      }

      const { type, data } = questionResult.rows[0];
      const strategy = ReadingQuestionFactory.createQuestionService(type);
      const result = await strategy.validateAnswer(questionId, userAnswer);
      
      totalScore += result.score;
      results.push({
        questionId,
        type,
        ...result
      });
    }

    const totalQuestions = results.length;
    const percentage = (totalScore / totalQuestions) * 100;

    return { 
      totalScore, 
      totalQuestions, 
      percentage, 
      results 
    };
  }

  async getQuestionDetails(questionId) {
    const result = await pool.query(
      'SELECT id, type, title, paragraph, data FROM reading_questions WHERE id = $1',
      [questionId]
    );

    if (result.rows.length === 0) {
      throw new Error('Question not found');
    }

    return result.rows[0];
  }
}