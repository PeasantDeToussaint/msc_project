import { BaseStrategy } from './baseStrategy.js';

export class SummaryCompletionStrategy extends BaseStrategy {
  constructor() {
    super('Summary Completion');
  }

  async validateAnswer(questionId, userAnswers) {
    const question = await this.getQuestionById(questionId);
    const data = question.data;

    let score = 0;
    const totalQuestions = data.length;
    const detailedResults = [];

    data.forEach((q, index) => {
      const userAnswer = userAnswers[q.id] || userAnswers[index];
      let isCorrect = false;

      if (Array.isArray(q.correct_answer)) {
        isCorrect = q.correct_answer.some(answer => 
          this.compareAnswers(userAnswer, answer)
        );
      } else if (typeof q.correct_answer === 'string') {
        isCorrect = this.compareAnswers(userAnswer, q.correct_answer);
      } else {
        console.error(`Unexpected correct_answer format for question ${q.id || index}`);
      }

      if (isCorrect) score++;
      detailedResults.push({
        id: q.id || index,
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

  compareAnswers(userAnswer, correctAnswer) {
    if (typeof userAnswer !== 'string' || typeof correctAnswer !== 'string') {
      return false;
    }
    return userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
  }
}