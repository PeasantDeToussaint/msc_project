import pool from '../../db.js';

export class BaseStrategy {
  constructor(questionType) {
    this.questionType = questionType;
  }

  async getQuestions(count) {
    const result = await pool.query(
      'SELECT id, type, title, paragraph, data FROM reading_questions WHERE type = $1 ORDER BY RANDOM() LIMIT $2',
      [this.questionType, count]
    );
    return result.rows;
  }

  async getQuestionById(id) {
    const result = await pool.query(
      'SELECT id, type, title, paragraph, data FROM reading_questions WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      throw new Error(`Question with id ${id} not found`);
    }
    return result.rows[0];
  }

  async validateAnswer(questionId, userAnswers) {
    throw new Error('validateAnswer method must be implemented by subclasses');
  }
}