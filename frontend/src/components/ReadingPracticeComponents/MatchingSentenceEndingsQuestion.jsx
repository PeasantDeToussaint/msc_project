"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from 'lucide-react'

export default function MatchingSentenceEndingsQuestion({ question }) {
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  const handleSelect = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const checkAnswers = () => {
    setShowResults(true)
  }

  const resetQuiz = () => {
    setAnswers({})
    setShowResults(false)
  }

  const score = question.data.questions.filter(q => 
    answers[q.id] === q.correctAnswer
  ).length

  return (
    <Card className="shadow-lg bg-white">
      <CardContent className="p-6 space-y-6">
        <ScrollArea className="h-[400px] rounded-lg border border-gray-200 p-4">
          <div className="space-y-4 text-sm leading-relaxed">
            <h2 className="text-xl font-bold mb-4">{question.title}</h2>
            <p>{question.paragraph}</p>
            <p className="whitespace-pre-wrap">{question.data.passage}</p>
          </div>
        </ScrollArea>

        <div className="space-y-4">
          <div className="bg-gray-100 border-l-4 border-gray-300 p-4 rounded-r-lg">
            <p className="text-sm text-gray-700">
              Questions 1-{question.data.questions.length}
            </p>
            <p className="text-sm text-gray-700">
              Complete each sentence with the correct ending, A-{String.fromCharCode(64 + question.data.endings.length)}.
            </p>
            <p className="text-sm text-gray-700">
              NB You may use any letter more than once.
            </p>
          </div>
          <div className="space-y-4">
            {question.data.questions.map((q) => (
              <div key={q.id} className="flex items-center space-x-2">
                <span className="font-medium w-96">{q.id}. {q.text}</span>
                <Select onValueChange={(value) => handleSelect(q.id, value)} value={answers[q.id] || ""}>
                  <SelectTrigger className={`w-full ${
                    showResults 
                      ? answers[q.id] === q.correctAnswer
                        ? 'border-green-500'
                        : 'border-red-500'
                      : ''
                  }`}>
                    <SelectValue placeholder="Select ending" />
                  </SelectTrigger>
                  <SelectContent>
                    {question.data.endings.map((ending) => (
                      <SelectItem key={ending.id} value={ending.id}>
                        {ending.id}. {ending.text}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                Score: {score} / {question.data.questions.length}
              </div>
            )}
          </div>
          {showResults && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Results:</h3>
              <ScrollArea className="h-[200px] rounded-lg border border-gray-200 p-4">
                <div className="space-y-2">
                  {question.data.questions.map((q) => (
                    <div key={q.id} className="flex items-start space-x-2">
                      {answers[q.id] === q.correctAnswer ? (
                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      ) : (
                        <XCircle className="text-red-500 mt-1 flex-shrink-0" />
                      )}
                      <div>
                        <span className="font-semibold">{q.id}. {q.text}</span>
                        <div className={answers[q.id] === q.correctAnswer ? "text-green-600" : "text-red-600"}>
                          Your answer: {answers[q.id] ? `${answers[q.id]}. ${question.data.endings.find(e => e.id === answers[q.id])?.text}` : "(no answer)"}
                        </div>
                        {answers[q.id] !== q.correctAnswer && (
                          <div className="text-gray-600">
                            Correct answer: {q.correctAnswer}. {question.data.endings.find(e => e.id === q.correctAnswer)?.text}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}