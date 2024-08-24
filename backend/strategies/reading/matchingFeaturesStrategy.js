import { BaseStrategy } from './baseStrategy.js';

export class MatchingFeaturesStrategy extends BaseStrategy {
  constructor() {
    super('Matching Features');
  }

  async validateAnswer(questionId, userAnswers) {
    const question = await this.getQuestionById(questionId);
    const data = question.data;

    let score = 0;
    const totalQuestions = data.subquestions.length;
    const detailedResults = [];

    data.correct_answers.forEach((answer) => {
      const userAnswer = userAnswers[answer.subquestion_id];
      const isCorrect = userAnswer === answer.option_id;
      if (isCorrect) score++;
      detailedResults.push({
        id: answer.subquestion_id,
        userAnswer,
        correctAnswer: answer.option_id,
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