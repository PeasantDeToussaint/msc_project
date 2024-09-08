"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from 'lucide-react'

export default function MatchingFeaturesQuestion({ question }) {
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  const handleSelect = (itemId, value) => {
    setAnswers(prev => ({ ...prev, [itemId]: value }))
  }

  const checkAnswers = () => {
    setShowResults(true)
  }

  const resetQuiz = () => {
    setAnswers({})
    setShowResults(false)
  }

  const getCorrectAnswer = (subquestionId) => {
    const correctAnswer = question.data.correct_answers.find(
      answer => answer.subquestion_id === subquestionId
    )
    return correctAnswer ? correctAnswer.option_id : null
  }

  const score = question.data.subquestions.filter(
    item => answers[item.id] === getCorrectAnswer(item.id)
  ).length

  return (
    <Card className="shadow-lg bg-white">
      <CardContent className="p-6 space-y-6">
        <ScrollArea className="h-[300px] rounded-lg border border-gray-200 p-4">
          <div className="space-y-4 text-sm leading-relaxed">
            <h2 className="text-xl font-bold mb-4">{question.title}</h2>
            <p className="whitespace-pre-wrap">{question.paragraph}</p>
          </div>
        </ScrollArea>

        <Separator />

        <div className="space-y-4">
          <div className="bg-gray-100 border-l-4 border-gray-300 p-4 rounded-r-lg">
            <p className="text-sm text-gray-700">
              {question.data.instructions}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.data.subquestions.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Label htmlFor={`item-${item.id}`} className="w-1/2 font-medium">
                  {item.prompt}
                </Label>
                <div className="flex items-center space-x-2">
                  <Select onValueChange={(value) => handleSelect(item.id, value)}>
                    <SelectTrigger 
                      id={`item-${item.id}`} 
                      className={`w-[200px] ${
                        showResults 
                          ? answers[item.id] === getCorrectAnswer(item.id)
                            ? 'border-green-500'
                            : 'border-red-500'
                          : ''
                      }`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {question.data.options.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.id}: {option.text}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
                Score: {score} / {question.data.subquestions.length}
              </div>
            )}
          </div>
          {showResults && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Results:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.data.subquestions.map((item) => (
                  <div key={item.id} className="flex items-start space-x-2">
                    {answers[item.id] === getCorrectAnswer(item.id) ? (
                      <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="text-red-500 mt-1 flex-shrink-0" />
                    )}
                    <div>
                      <p className="font-semibold">{item.prompt}</p>
                      <p className={answers[item.id] === getCorrectAnswer(item.id) ? "text-green-600" : "text-red-600"}>
                        Your answer: {question.data.options.find(option => option.id === answers[item.id])?.text || "(no answer)"}
                      </p>
                      {answers[item.id] !== getCorrectAnswer(item.id) && (
                        <p className="text-gray-600">
                          Correct answer: {question.data.options.find(option => option.id === getCorrectAnswer(item.id))?.text}
                        </p>
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