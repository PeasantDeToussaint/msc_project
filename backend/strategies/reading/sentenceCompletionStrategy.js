import { BaseStrategy } from './baseStrategy.js';

export class SentenceCompletionStrategy extends BaseStrategy {
  constructor() {
    super('Sentence Completion');
  }

  async validateAnswer(questionId, userAnswers) {
    const question = await this.getQuestionById(questionId);
    const data = question.data;

    let score = 0;
    const totalQuestions = data.length;
    const detailedResults = [];

    data.forEach((q, index) => {
      const userAnswer = userAnswers[index];
      const isCorrect = Array.isArray(q.correct_answer)
        ? q.correct_answer.some(answer => answer.toLowerCase() === (userAnswer || '').toLowerCase())
        : q.correct_answer.toLowerCase() === (userAnswer || '').toLowerCase();
      if (isCorrect) score++;
      detailedResults.push({
        id: index,
        userAnswer,
        correctAnswer: q.correct_answer,
        isCorrect
      });
    });

    return {
      score,
      totalQuestions,
      percentage: (score / totalQuestions) * 100,
      detailedResults
    };
  }
}