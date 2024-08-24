import { BaseStrategy } from './baseStrategy.js';

export class MultipleChoiceStrategy extends BaseStrategy {
  constructor() {
    super('Multiple Choice');
  }

  async validateAnswer(questionId, userAnswers) {
    const question = await this.getQuestionById(questionId);
    const data = question.data;

    let score = 0;
    const totalQuestions = data.questions.length;
    const detailedResults = [];

    data.questions.forEach((q) => {
      const userAnswer = userAnswers[q.id];
      const isCorrect = q.correctAnswers.includes(userAnswer);
      if (isCorrect) score++;
      detailedResults.push({
        id: q.id,
        userAnswer,
        correctAnswer: q.correctAnswers,
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