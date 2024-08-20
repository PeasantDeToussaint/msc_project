'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from 'lucide-react'

const passage = `[Note: This is an extract from a Part 3 text about language.]
© Guy Deutscher, Random House Adult Trade Publishing Group. 2006

'This Marvellous Invention'

Of all mankind's manifold creations, language must take pride of place. Other inventions – the wheel, agriculture, sliced bread – may have transformed our material existence, but the advent of language is what made us human. Compared to language, all other inventions pale in significance, since everything we have ever achieved depends on language and originates from it. Without language, we could never have embarked on our ascent to unparalleled power over all other animals, and even over nature itself.

But language is foremost not just because it came first. In its own right it is a tool of extraordinary sophistication, yet based on an idea of ingenious simplicity: 'this marvellous invention of composing out of twenty-five or thirty sounds that infinite variety of expressions which, whilst having in themselves no likeness to what is in our mind, allow us to disclose to others its whole secret, and to make known to those who cannot penetrate it all that we imagine, and all the various stirrings of our soul'. This was how, in 1660, the renowned French grammarians of the Port-Royal abbey near Versailles distilled the essence of language, and no one since has celebrated more eloquently the magnitude of its achievement. Even so, there is just one flaw in all these hymns of praise, for the homage to language's unique accomplishment conceals a simple yet critical incongruity. Language is mankind's greatest invention – except, of course, that it was never invented. This apparent paradox is at the core of our fascination with language, and it holds many of its secrets.`

const summaryParts = [
  "The wheel is one invention that has had a major impact on ",
  " aspects of life, but no impact has been as ",
  " as that of language. Language is very ",
  ", yet composed of just a small number of sounds. Language appears to be ",
  " to use. However, its sophistication is often overlooked."
]

const options = [
  { letter: 'A', word: 'difficult' },
  { letter: 'B', word: 'complex' },
  { letter: 'C', word: 'original' },
  { letter: 'D', word: 'admired' },
  { letter: 'E', word: 'material' },
  { letter: 'F', word: 'easy' },
  { letter: 'G', word: 'fundamental' }
]

const correctAnswers = {
  1: 'E',
  2: 'G',
  3: 'B',
  4: 'F'
}

export default function Component() {
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

  const score = Object.entries(answers).filter(([id, answer]) => 
    answer === correctAnswers[parseInt(id)]
  ).length

  return (
    <Card className="shadow-lg bg-white">
      <CardContent className="p-6 space-y-6">
        <ScrollArea className="h-[400px] rounded-lg border border-gray-200 p-4">
          <div className="space-y-4 text-sm leading-relaxed">
            <h2 className="text-xl font-bold mb-4">IELTS Academic Reading: Summary Completion</h2>
            <p className="whitespace-pre-wrap">{passage}</p>
          </div>
        </ScrollArea>

        <div className="space-y-4">
          <div className="bg-gray-100 border-l-4 border-gray-300 p-4 rounded-r-lg">
            <p className="text-sm text-gray-700">
              Complete the summary using the list of words, A-G, below.
            </p>
            <p className="text-sm text-gray-700">
              Write the correct letter, A-G, in boxes 1-4 on your answer sheet.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">The importance of language</h3>
            <p className="leading-relaxed">
              {summaryParts.map((part, index) => (
                <span key={index}>
                  {part}
                  {index < summaryParts.length - 1 && (
                    <span className="inline-block w-24 mx-1 border-b-2 border-gray-300 align-bottom text-center">
                      {answers[index + 1] && (
                        <span className={`text-sm ${showResults ? (answers[index + 1] === correctAnswers[index + 1] ? 'text-green-600' : 'text-red-600') : 'text-gray-600'}`}>
                          {options.find(o => o.letter === answers[index + 1])?.word || ''}
                        </span>
                      )}
                    </span>
                  )}
                </span>
              ))}
            </p>
            <div className="grid grid-cols-4 gap-2">
              {options.map(option => (
                <div key={option.letter} className="flex items-center space-x-2">
                  <span className="font-medium">{option.letter}</span>
                  <span>{option.word}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((questionId) => (
              <div key={questionId} className="flex items-center space-x-2">
                <span className="font-medium w-6">{questionId}.</span>
                <Select onValueChange={(value) => handleSelect(questionId, value)} value={answers[questionId] || ""}>
                  <SelectTrigger className={`w-[100px] ${
                    showResults 
                      ? answers[questionId] === correctAnswers[questionId]
                        ? 'border-green-500'
                        : 'border-red-500'
                      : ''
                  }`}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem key={option.letter} value={option.letter}>
                        {option.letter}
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
                Score: {score} / 4
              </div>
            )}
          </div>
          {showResults && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Results:</h3>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((questionId) => (
                  <div key={questionId} className="flex items-start space-x-2">
                    {answers[questionId] === correctAnswers[questionId] ? (
                      <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="text-red-500 mt-1 flex-shrink-0" />
                    )}
                    <div>
                      <span className="font-semibold">{questionId}.</span>
                      <span className={answers[questionId] === correctAnswers[questionId] ? "text-green-600" : "text-red-600"}>
                        Your answer: {answers[questionId] ? `${answers[questionId]} (${options.find(o => o.letter === answers[questionId])?.word})` : "(no answer)"}
                      </span>
                      {answers[questionId] !== correctAnswers[questionId] && (
                        <span className="text-gray-600">
                          {" "}Correct answer: {correctAnswers[questionId]} ({options.find(o => o.letter === correctAnswers[questionId])?.word})
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