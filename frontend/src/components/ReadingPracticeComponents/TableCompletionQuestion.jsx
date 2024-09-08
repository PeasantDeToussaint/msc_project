"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from 'lucide-react'

export default function TableCompletionQuestion({ question }) {
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  const handleInputChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }))
  }

  const checkAnswers = () => {
    setShowResults(true)
  }

  const resetQuiz = () => {
    setAnswers({})
    setShowResults(false)
  }

  const score = question.data.questions.filter(q => 
    answers[q.id]?.toLowerCase().trim() === q.correct_answer.toLowerCase()
  ).length

  return (
    <Card className="shadow-lg bg-white">
      <CardContent className="p-6 space-y-8">
        <ScrollArea className="h-[300px] rounded-lg border border-gray-200 p-4">
          <div className="space-y-4 text-sm leading-relaxed">
            <h2 className="text-xl font-bold mb-4">{question.title}</h2>
            <p className="whitespace-pre-wrap">{question.paragraph}</p>
          </div>
        </ScrollArea>

        <div className="space-y-4">
          <div className="bg-gray-100 border-l-4 border-gray-300 p-4 rounded-r-lg">
            <p className="text-sm text-gray-700">
              Complete the table below. Choose <span className="font-semibold">NO MORE THAN TWO WORDS AND/OR A NUMBER</span> from the passage for each answer.
            </p>
          </div>
          <Table className="border-2">
            <TableHeader>
              <TableRow className="bg-gray-100">
                {question.data.table_structure.headers.map((header, index) => (
                  <TableHead key={index} className="text-center font-semibold">{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {question.data.table_structure.rows.map((row, rowIndex) => (
                <TableRow key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-50" : ""}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex} className="p-2">
                      {cell.includes("[") ? (
                        <div className="flex items-center space-x-2">
                          {cell.split(/\[|\]/).map((part, partIndex) => {
                            if (partIndex % 2 === 0) {
                              return <span key={partIndex}>{part}</span>
                            } else {
                              const questionId = part
                              return (
                                <Input 
                                  key={partIndex}
                                  id={questionId}
                                  value={answers[questionId] || ""}
                                  onChange={(e) => handleInputChange(questionId, e.target.value)}
                                  className={`w-32 inline-block ${
                                    showResults 
                                      ? answers[questionId]?.toLowerCase().trim() === question.data.questions.find(q => q.id === questionId)?.correct_answer.toLowerCase()
                                        ? 'border-green-500'
                                        : 'border-red-500'
                                      : 'border-blue-300 focus:border-blue-500'
                                  }`}
                                />
                              )
                            }
                          })}
                        </div>
                      ) : (
                        cell
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.data.questions.map((q) => (
                  <div key={q.id} className="flex items-center space-x-2">
                    {answers[q.id]?.toLowerCase().trim() === q.correct_answer.toLowerCase() ? (
                      <CheckCircle className="text-green-500" />
                    ) : (
                      <XCircle className="text-red-500" />
                    )}
                    <span className="font-semibold">{q.id}:</span>
                    <span className={answers[q.id]?.toLowerCase().trim() === q.correct_answer.toLowerCase() ? "text-green-600" : "text-red-600"}>
                      Your answer: {answers[q.id] || "(no answer)"}
                    </span>
                    {answers[q.id]?.toLowerCase().trim() !== q.correct_answer.toLowerCase() && (
                      <span className="text-gray-600">
                        Correct: {q.correct_answer}
                      </span>
                    )}
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