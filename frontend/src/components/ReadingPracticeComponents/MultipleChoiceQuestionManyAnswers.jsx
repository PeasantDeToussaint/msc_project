'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, MinusCircle } from 'lucide-react'

const passage = `[Note: This is an extract from a Part 1 text about older people in the workforce.]
© The Economist Newspaper Limited, London, 1999

Clearly, when older people do heavy physical work, their age may affect their productivity. But other skills may increase with age, including many that are crucial for good management, such as an ability to handle people diplomatically, to run a meeting or to spot a problem before it blows up. Peter Hicks, who co-ordinates OECD work on the policy implications of ageing, says that plenty of research suggests older people are paid more because they are worth more.

And the virtues of the young may be exaggerated. 'The few companies that have kept on older workers find they have good judgement and their productivity is good,' says Peter Peterson, author of a recent book on the impact of ageing. 'Besides, their education standards are much better than those of today's young high-school graduates.' Companies may say that older workers are not worth training because they are reaching the end of their working lives; in fact, young people tend to switch jobs so frequently that they offer the worst returns on training. The median age for employer-driven training is the late 40s and early 50s, and this training goes mainly to managers.

OECD: Organisation for Economic Co-operation and Development`

const questions = [
  {
    id: 1,
    text: "The list below gives some of the advantages of employing older workers. Which TWO advantages are mentioned by the writer of the text?",
    options: [
      { id: 'A', text: "They are less likely to be involved in careless accidents." },
      { id: 'B', text: "They can predict areas that may cause trouble in the future." },
      { id: 'C', text: "They are able to train younger workers." },
      { id: 'D', text: "They can deal with unexpected problems." },
      { id: 'E', text: "They are more conscientious." },
      { id: 'F', text: "They are prepared to work for lower salaries." },
      { id: 'G', text: "They are more skilled in personal relationships." },
    ],
    correctAnswers: ['B', 'G']
  },
  {
    id: 2,
    text: "The list below gives some of the disadvantages of employing younger workers. Which TWO disadvantages are mentioned by the writer of the text?",
    options: [
      { id: 'A', text: "They are too confident of their own skills." },
      { id: 'B', text: "They may injure themselves." },
      { id: 'C', text: "They do not stay with the same company for very long." },
      { id: 'D', text: "Their training has been too theoretical." },
      { id: 'E', text: "They are not as well educated as older workers." },
      { id: 'F', text: "They demand higher salaries" },
    ],
    correctAnswers: ['C', 'E']
  }
]

export default function Component() {
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  const handleSelect = (questionId, optionId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [optionId]: !prev[questionId]?.[optionId]
      }
    }))
  }

  const checkAnswers = () => {
    setShowResults(true)
  }

  const resetQuiz = () => {
    setAnswers({})
    setShowResults(false)
  }

  const calculateScore = () => {
    return questions.reduce((score, question) => {
      const selectedAnswers = Object.entries(answers[question.id] || {})
        .filter(([_, isSelected]) => isSelected)
        .map(([id, _]) => id)
      
      const correctSelections = selectedAnswers.filter(answer => question.correctAnswers.includes(answer))
      const incorrectSelections = selectedAnswers.filter(answer => !question.correctAnswers.includes(answer))
      
      if (correctSelections.length === question.correctAnswers.length && incorrectSelections.length === 0) {
        return score + 1
      } else if (correctSelections.length > 0 && incorrectSelections.length === 0) {
        return score + 0.5
      }
      return score
    }, 0)
  }

  const score = calculateScore()

  return (
    <Card className="shadow-lg bg-white">
      <CardContent className="p-6 space-y-6">
        <ScrollArea className="h-[400px] rounded-lg border border-gray-200 p-4">
          <div className="space-y-4 text-sm leading-relaxed">
            <h2 className="text-xl font-bold mb-4">IELTS Academic Reading: Multiple Choice (more than one answer)</h2>
            <p className="whitespace-pre-wrap">{passage}</p>
          </div>
        </ScrollArea>

        <div className="space-y-4">
          <div className="bg-gray-100 border-l-4 border-gray-300 p-4 rounded-r-lg">
            <p className="text-sm text-gray-700">
              Choose TWO letters, A-G.
            </p>
            <p className="text-sm text-gray-700">
              Write the correct letters in boxes 1 and 2 on your answer sheet.
            </p>
          </div>
          <div className="space-y-6">
            {questions.map((question) => (
              <div key={question.id} className="space-y-2">
                <h3 className="font-medium">{question.id}. {question.text}</h3>
                {question.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`q${question.id}-${option.id}`}
                      checked={answers[question.id]?.[option.id] || false}
                      onCheckedChange={() => handleSelect(question.id, option.id)}
                      className={`${
                        showResults 
                          ? question.correctAnswers.includes(option.id)
                            ? 'border-green-500'
                            : answers[question.id]?.[option.id]
                              ? 'border-red-500'
                              : ''
                          : ''
                      }`}
                    />
                    <Label htmlFor={`q${question.id}-${option.id}`}>{option.id}. {option.text}</Label>
                  </div>
                ))}
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
                Score: {score} / {questions.length}
              </div>
            )}
          </div>
          {showResults && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Results:</h3>
              <div className="space-y-4">
                {questions.map((question) => {
                  const selectedAnswers = Object.entries(answers[question.id] || {})
                    .filter(([_, isSelected]) => isSelected)
                    .map(([id, _]) => id)
                  const correctSelections = selectedAnswers.filter(answer => question.correctAnswers.includes(answer))
                  const incorrectSelections = selectedAnswers.filter(answer => !question.correctAnswers.includes(answer))
                  const isFullyCorrect = correctSelections.length === question.correctAnswers.length && incorrectSelections.length === 0
                  const isPartiallyCorrect = correctSelections.length > 0 && incorrectSelections.length === 0

                  return (
                    <div key={question.id} className="flex items-start space-x-2">
                      {isFullyCorrect ? (
                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      ) : isPartiallyCorrect ? (
                        <MinusCircle className="text-yellow-500 mt-1 flex-shrink-0" />
                      ) : (
                        <XCircle className="text-red-500 mt-1 flex-shrink-0" />
                      )}
                      <div>
                        <span className="font-semibold">{question.id}. {question.text}</span>
                        <div className={isFullyCorrect ? "text-green-600" : isPartiallyCorrect ? "text-yellow-600" : "text-red-600"}>
                          Your answer: {selectedAnswers.join(', ') || "(no answer)"}
                        </div>
                        {!isFullyCorrect && (
                          <div className="text-gray-600">
                            Correct answer: {question.correctAnswers.join(', ')}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}