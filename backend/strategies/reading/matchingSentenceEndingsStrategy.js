import { BaseStrategy } from './baseStrategy.js';

export class MatchingSentenceEndingsStrategy extends BaseStrategy {
  constructor() {
    super('Matching Sentence Endings');
  }

  async validateAnswer(questionId, userAnswers) {
    const question = await this.getQuestionById(questionId);
    const data = question.data;

    let score = 0;
    const totalQuestions = data.questions.length;
    const detailedResults = [];

    data.questions.forEach((q) => {
      const userAnswer = userAnswers[q.id];
      const isCorrect = q.correctAnswer === userAnswer;
      if (isCorrect) score++;
      detailedResults.push({
        id: q.id,
        userAnswer,
        correctAnswer: q.correctAnswer,
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