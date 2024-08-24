import { MultipleChoiceStrategy } from '../../strategies/reading/multipleChoiceStrategy.js';
import { FlowChartCompletionStrategy } from '../../strategies/reading/flowChartCompletionStrategy.js';
import { IdentifyingInformationStrategy } from '../../strategies/reading/identifyingInformationStrategy.js';
import { MatchingFeaturesStrategy } from '../../strategies/reading/matchingFeaturesStrategy.js';
import { MatchingHeadingsStrategy } from '../../strategies/reading/matchingHeadingsStrategy.js';
import { MatchingSentenceEndingsStrategy } from '../../strategies/reading/matchingSentenceEndingsStrategy.js';
import { SentenceCompletionStrategy } from '../../strategies/reading/sentenceCompletionStrategy.js';
import { SummaryCompletionStrategy } from '../../strategies/reading/summaryCompletionStrategy.js';
import { TableCompletionStrategy } from '../../strategies/reading/TableCompletionStrategy.js';

export class ReadingQuestionFactory {
  static createQuestionService(type) {
    switch (type) {
      case 'Multiple Choice':
        return new MultipleChoiceStrategy();
      case 'Flowchart Completion':
        return new FlowChartCompletionStrategy();
      case 'Identifying Information':
        return new IdentifyingInformationStrategy();
      case 'Matching Features':
        return new MatchingFeaturesStrategy();
      case 'Matching Headings':
        return new MatchingHeadingsStrategy();
      case 'Matching Sentence Endings':
        return new MatchingSentenceEndingsStrategy();
      case 'Sentence Completion':
        return new SentenceCompletionStrategy();
      case 'Summary Completion':
        return new SummaryCompletionStrategy();
      case 'Table Completion':
        return new TableCompletionStrategy();
      default:
        throw new Error(`Unsupported question type: ${type}`);
    }
  }
}