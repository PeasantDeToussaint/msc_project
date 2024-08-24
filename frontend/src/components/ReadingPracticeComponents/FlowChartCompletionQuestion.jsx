'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, CheckCircle, XCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"

const correctAnswers = {
  '1': 'rainfall',
  '2': 'starvation',
  '3': 'vegetation'
}

const initialAnswers = {
  '1': '', '2': '', '3': ''
}

export default function Component() {
  const [answers, setAnswers] = useState(initialAnswers)
  const [showResults, setShowResults] = useState(false)

  const handleInputChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value.toLowerCase() }))
  }

  const checkAnswers = () => {
    setShowResults(true)
  }

  const resetQuiz = () => {
    setAnswers(initialAnswers)
    setShowResults(false)
  }

  const score = Object.entries(answers).filter(([id, answer]) => 
    answer.trim() === correctAnswers[id]
  ).length

  return (
    <Card className="shadow-lg bg-white">
      <CardContent className="p-6">
        <div className="flex space-x-6">
          <div className="w-1/2">
            <ScrollArea className="h-[500px] rounded-lg border border-gray-200 p-4">
              <div className="space-y-4 text-sm leading-relaxed">
                <p>
                  Natural selection, Darwin argued, was an inevitable outcome of three principles that operated in nature. First, most characteristics of organisms are inherited, or passed from parent to offspring. Although no one, including Darwin and Wallace, knew how this happened at the time, it was a common understanding. Second, more offspring are produced than are able to survive, so resources for survival and reproduction are limited. The capacity for reproduction in all organisms outstrips the availability of resources to support their numbers. Thus, there is competition for those resources in each generation. Both Darwin and Wallace's understanding of this principle came from reading economist Thomas Malthus' essay that explained this principle in relation to human populations. Third, offspring vary among each other in regard to their characteristics and those variations are inherited. Darwin and Wallace reasoned that offspring with inherited characteristics which allow them to best compete for limited resources will survive and have more offspring than those individuals with variations that are less able to compete. Because characteristics are inherited, these traits will be better represented in the next generation. This will lead to change in populations over generations in a process that Darwin called descent with modification. Ultimately, natural selection leads to greater adaptation of the population to its local environment. It is the only mechanism known for adaptive evolution.
                </p>
                <p>
                  In 1858, Darwin and Wallace presented papers at the Linnean Society in London that discussed the idea of natural selection. The following year, Darwin's book, On the Origin of Species, was published. His book outlined in considerable detail his arguments for evolution by natural selection.
                </p>
                <p>
                  It is difficult and time-consuming to document and present examples of evolution by natural selection, but the Galápagos finches are an excellent example. Researchers Peter and Rosemary Grant – a husband-and-wife team – first travelled to Daphne Major in the Galápagos Islands in 1973 to study the finch populations there. They had initially planned to study them over a two-year period, but it evolved into a 40-year research project that has provided important evidence of natural selection. Much of the Grants' research focused on the medium ground finch.
                </p>
                <p>
                  The island of Daphne Major saw only 24 millimetres of rainfall in early 1977, a time of year that was not supposed to be so dry. Finches with larger beaks survived because they were able to crack open the larger, tougher seeds that remained, but most of those with smaller beaks succumbed to starvation. In 1978, the Grants returned to Daphne Major to document the effect on the next generation of medium ground finches, discovering that the offspring had measurably larger beaks. However, the endless deluge of 1982–83 reversed the trend. There was a marked shift in the types of vegetation growing on the island, which gave finches with smaller beaks an advantage over their counterparts with larger beaks. In the following years, the Grants measured beak sizes and found that the average beak size had nudged lower. Over the course of just a few years, the Grants had witnessed natural selection in action. Their findings and insights have become iconic in the field of evolutionary biology.
                </p>
              </div>
            </ScrollArea>
          </div>

          <div className="w-1/2">
            <ScrollArea className="h-[500px] rounded-lg border border-gray-200 p-4">
              <div className="space-y-4">
                <div className="bg-gray-100 border-l-4 border-gray-300 p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700">
                    Complete the flow-chart. Write <span className="font-semibold">ONE WORD ONLY</span> from the text in each gap.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700">The Grants' research</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex flex-col items-center">
                      <p>In early 1977, more <Input 
                        value={answers['1']}
                        onChange={(e) => handleInputChange('1', e.target.value)}
                        className={`w-20 inline-block mx-1 text-center border-b ${
                          showResults 
                            ? answers['1'].trim() === correctAnswers['1']
                              ? 'border-green-500'
                              : 'border-red-500'
                            : 'border-gray-300 focus:border-gray-500'
                        }`}
                      /> had been expected.</p>
                      <ChevronDown className="my-1 text-gray-400" size={20} />
                      <p><Input 
                        value={answers['2']}
                        onChange={(e) => handleInputChange('2', e.target.value)}
                        className={`w-20 inline-block mx-1 text-center border-b ${
                          showResults 
                            ? answers['2'].trim() === correctAnswers['2']
                              ? 'border-green-500'
                              : 'border-red-500'
                            : 'border-gray-300 focus:border-gray-500'
                        }`}
                      /> killed many finches.</p>
                      <ChevronDown className="my-1 text-gray-400" size={20} />
                      <p>The next generation had larger beaks.</p>
                      <ChevronDown className="my-1 text-gray-400" size={20} />
                      <p>The island's <Input 
                        value={answers['3']}
                        onChange={(e) => handleInputChange('3', e.target.value)}
                        className={`w-20 inline-block mx-1 text-center border-b ${
                          showResults 
                            ? answers['3'].trim() === correctAnswers['3']
                              ? 'border-green-500'
                              : 'border-red-500'
                            : 'border-gray-300 focus:border-gray-500'
                        }`}
                      /> changed in 1982–3.</p>
                      <ChevronDown className="my-1 text-gray-400" size={20} />
                      <p>There were smaller beaks in subsequent generations.</p>
                    </div>
                  </div>
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
                      Score: {score} / 3
                    </div>
                  )}
                </div>
                {showResults && (
                  <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Results:</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {Object.entries(correctAnswers).map(([id, answer]) => (
                        <div key={id} className="flex items-center space-x-2">
                          {answers[id].trim().toLowerCase() === answer.toLowerCase() ? (
                            <CheckCircle className="text-green-500" />
                          ) : (
                            <XCircle className="text-red-500" />
                          )}
                          <span className="font-semibold">{id}:</span>
                          <span className={answers[id].trim().toLowerCase() === answer.toLowerCase() ? "text-green-600" : "text-red-600"}>
                            Your answer: {answers[id] || "(no answer)"}
                          </span>
                          {answers[id].trim().toLowerCase() !== answer.toLowerCase() && (
                            <span className="text-gray-600">
                              Correct: {answer}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}