import { BaseStrategy } from './baseStrategy.js';

export class FlowChartCompletionStrategy extends BaseStrategy {
  constructor() {
    super('Flowchart Completion');
  }

  async validateAnswer(questionId, userAnswers) {
    const question = await this.getQuestionById(questionId);
    const data = question.data;

    let score = 0;
    const totalQuestions = data.gaps.length;
    const detailedResults = [];

    data.gaps.forEach((gap) => {
      const userAnswer = userAnswers[gap.id];
      const isCorrect = gap.correct_answer.toLowerCase() === (userAnswer || '').toLowerCase();
      if (isCorrect) score++;
      detailedResults.push({
        id: gap.id,
        userAnswer,
        correctAnswer: gap.correct_answer,
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