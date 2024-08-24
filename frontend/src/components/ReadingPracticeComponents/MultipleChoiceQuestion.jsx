import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from 'lucide-react';

export default function MultipleChoiceQuestion({ 
  question = {
    id: 0,
    type: '',
    title: '',
    paragraph: '',
    data: []
  } 
}) {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionId, optionId) => {
    const questionType = question.data.find(q => q.id === questionId)?.type;
    if (questionType === "single") {
      setAnswers(prev => ({
        ...prev,
        [questionId]: optionId
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        [questionId]: {
          ...prev[questionId],
          [optionId]: !prev[questionId]?.[optionId]
        }
      }));
    }
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    setAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    let totalScore = 0;

    question.data.forEach(questionItem => {
      if (!questionItem || !questionItem.type || !questionItem.correctAnswers) {
        return;
      }

      if (questionItem.type === "single") {
        totalScore += answers[questionItem.id] === questionItem.correctAnswers[0] ? 1 : 0;
      } else {
        const selectedAnswers = Object.entries(answers[questionItem.id] || {})
          .filter(([_, isSelected]) => isSelected)
          .map(([id, _]) => id);
        
        const correctSelections = selectedAnswers.filter(answer => questionItem.correctAnswers.includes(answer));
        const incorrectSelections = selectedAnswers.filter(answer => !questionItem.correctAnswers.includes(answer));
        
        if (correctSelections.length === questionItem.correctAnswers.length && incorrectSelections.length === 0) {
          totalScore += 1;
        } else if (correctSelections.length > 0 && incorrectSelections.length === 0) {
          totalScore += 0.5;
        }
      }
    });

    return totalScore;
  };

  const score = calculateScore();

  return (
    <Card className="shadow-lg bg-white">
      <CardContent className="p-6 space-y-6">
        <ScrollArea className="h-[400px] rounded-lg border border-gray-200 p-4">
          <div className="space-y-4 text-sm leading-relaxed">
            <h2 className="text-xl font-bold mb-4">{question.title}</h2>
            <p className="whitespace-pre-wrap">{question.paragraph}</p>
          </div>
        </ScrollArea>

        <div className="space-y-4">
          <div className="bg-gray-100 border-l-4 border-gray-300 p-4 rounded-r-lg">
            <p className="text-sm text-gray-700">
              Answer the questions below based on the passage.
            </p>
            <p className="text-sm text-gray-700">
              For multiple choice questions, choose TWO letters, A-G.
            </p>
            <p className="text-sm text-gray-700">
              For single choice questions, choose ONE letter, A-D.
            </p>
          </div>
          <div className="space-y-6">
            {question.data.map((questionItem) => (
              <div key={questionItem.id} className="space-y-2">
                <h3 className="font-medium">{questionItem.id}. {questionItem.text}</h3>
                {questionItem.type === "single" ? (
                  <RadioGroup
                    value={answers[questionItem.id] || ""}
                    onValueChange={(value) => handleSelect(questionItem.id, value)}
                  >
                    {questionItem.options && questionItem.options.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <RadioGroupItem
                          id={`q${questionItem.id}-${option.id}`}
                          value={option.id}
                          className={`${
                            showResults 
                              ? questionItem.correctAnswers.includes(option.id)
                                ? 'border-green-500'
                                : answers[questionItem.id] === option.id
                                  ? 'border-red-500'
                                  : ''
                              : ''
                          }`}
                        />
                        <Label htmlFor={`q${questionItem.id}-${option.id}`}>{option.id}. {option.text}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  questionItem.options && questionItem.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`q${questionItem.id}-${option.id}`}
                        checked={answers[questionItem.id]?.[option.id] || false}
                        onCheckedChange={() => handleSelect(questionItem.id, option.id)}
                        className={`${
                          showResults 
                            ? questionItem.correctAnswers.includes(option.id)
                              ? 'border-green-500'
                              : answers[questionItem.id]?.[option.id]
                                ? 'border-red-500'
                                : ''
                            : ''
                        }`}
                      />
                      <Label htmlFor={`q${questionItem.id}-${option.id}`}>{option.id}. {option.text}</Label>
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-6">
            <div className="space-x-4">
              <Button 
                onClick={checkAnswers} 
                disabled={showResults}
                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
              >
                Check Answers
              </Button>
              <Button 
                onClick={resetQuiz}
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
              >
                Reset
              </Button>
            </div>
            {showResults && (
              <div className="text-lg font-semibold bg-gray-100 py-2 px-4 rounded">
                Score: {score} / {question.data.length}
              </div>
            )}
          </div>
          {showResults && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Results:</h3>
              <div className="space-y-4">
                {question.data.map((questionItem) => {
                  const questionScore = 
                    questionItem.type === "single"
                      ? answers[questionItem.id] === questionItem.correctAnswers[0] ? 1 : 0
                      : calculateScoreForQuestion(questionItem);
                  
                  return (
                    <div key={questionItem.id} className="flex items-start space-x-2">
                      {questionScore === 1 ? (
                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      ) : (
                        <XCircle className="text-red-500 mt-1 flex-shrink-0" />
                      )}
                      <div>
                        <span className="font-semibold">{questionItem.id}. {questionItem.text}</span>
                        <div className={questionScore === 1 ? "text-green-600" : "text-red-600"}>
                          Your answer: {questionItem.type === "single" ? answers[questionItem.id] || "(no answer)" : Object.keys(answers[questionItem.id] || {}).filter(key => answers[questionItem.id][key]).join(', ') || "(no answer)"}
                        </div>
                        {questionScore !== 1 && (
                          <div className="text-gray-600">
                            Correct answer: {questionItem.correctAnswers.join(', ')}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

MultipleChoiceQuestion.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    paragraph: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
      })).isRequired,
      correctAnswers: PropTypes.arrayOf(PropTypes.string).isRequired
    })).isRequired
  }).isRequired
};
