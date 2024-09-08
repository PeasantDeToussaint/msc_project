"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from 'lucide-react'

export default function SummaryCompletionQuestion({ question }) {
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  const handleInputChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const checkAnswers = () => {
    setShowResults(true)
  }

  const resetQuiz = () => {
    setAnswers({})
    setShowResults(false)
  }

  const isCorrectAnswer = (userAnswer, correctAnswer) => {
    if (typeof userAnswer !== 'string' || typeof correctAnswer !== 'string') {
      return false
    }
    return userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
  }

  const score = question.data.filter(q => 
    isCorrectAnswer(answers[q.question], q.correct_answer)
  ).length

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
              Complete the summary below using words from the passage.
            </p>
            <p className="text-sm text-gray-700">
              Choose NO MORE THAN TWO WORDS from the passage for each answer.
            </p>
          </div>
          <div className="space-y-4">
            {question.data.map((q, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="font-medium">{index + 1}.</span>
                <p className="flex-grow">
                  {q.question.split('__________').map((part, partIndex, array) => (
                    <span key={partIndex}>
                      {part}
                      {partIndex < array.length - 1 && (
                        <Input
                          value={answers[q.question] || ''}
                          onChange={(e) => handleInputChange(q.question, e.target.value)}
                          className={`w-32 inline-block mx-1 ${
                            showResults 
                              ? isCorrectAnswer(answers[q.question], q.correct_answer)
                                ? 'border-green-500'
                                : 'border-red-500'
                              : ''
                          }`}
                        />
                      )}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-6">
            <div className="space-x-4">
              <Button 
                onClick={checkAnswers} 
                disabled={showResults}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Check Answers
              </Button>
              <Button 
                onClick={resetQuiz}
                variant="outline"
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
              <div className="space-y-2">
                {question.data.map((q, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    {isCorrectAnswer(answers[q.question], q.correct_answer) ? (
                      <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="text-red-500 mt-1 flex-shrink-0" />
                    )}
                    <div>
                      <span className="font-semibold">{index + 1}. </span>
                      <span className={isCorrectAnswer(answers[q.question], q.correct_answer) ? "text-green-600" : "text-red-600"}>
                        Your answer: {answers[q.question] || "(no answer)"}
                      </span>
                      {!isCorrectAnswer(answers[q.question], q.correct_answer) && (
                        <span className="text-gray-600">
                          {" "}Correct answer: {q.correct_answer}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}