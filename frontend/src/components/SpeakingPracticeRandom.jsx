import React, { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";

const RandomQuestions = () => {
  const [questions, setQuestions] = useState({ part1: [], part2: [], part3: [] });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/speakingQuestions/random-questions');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const renderQuestions = (questions, part) => {
    if (!questions[part] || questions[part].length === 0) {
      return <p>No questions available for this section.</p>;
    }
    return questions[part].map((question, index) => (
      <div key={question.id}>
        <h3 className="text-base font-semibold mb-2">Question {index + 1}</h3>
        <div className="flex flex-col gap-2">
          <p className="text-sm">{question.question}</p>
          <div className="bg-muted rounded-md p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Record your response</span>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-xs">Time limit: {question.time_limit}s</span>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary">
                  Record
                </button>
              </div>
            </div>
            <div className="mt-4">
              <Progress value={question.time_limit} aria-label="Recording progress" />
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold mb-4">Part 1</h2>
            <div className="space-y-4">
              {renderQuestions(questions, 'part1')}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">Part 2</h2>
            <div className="space-y-4">
              {renderQuestions(questions, 'part2')}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">Part 3</h2>
            <div className="space-y-4">
              {renderQuestions(questions, 'part3')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomQuestions;
