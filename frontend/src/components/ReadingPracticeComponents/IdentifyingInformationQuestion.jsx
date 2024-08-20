'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from 'lucide-react'

const paragraphs = [
  { id: 'A', content: "There are now over 700 million motor vehicles in the world - and the number is rising by more than 40 million each year. The average distance driven by car users is growing too - from 8 km a day per person in western Europe in 1965 to 25 km a day in 1995. This dependence on motor vehicles has given rise to major problems, including environmental pollution, depletion of oil resources, traffic congestion and safety." },
  { id: 'B', content: "While emissions from new cars are far less harmful than they used to be, city streets and motorways are becoming more crowded than ever, often with older trucks, buses and taxis, which emit excessive levels of smoke and fumes. This concentration of vehicles makes air quality in urban areas unpleasant and sometimes dangerous to breathe. Even Moscow has joined the list of capitals afflicted by congestion and traffic fumes. In Mexico City, vehicle pollution is a major health hazard." },
  { id: 'C', content: "Until a hundred years ago, most journeys were in the 20 km range, the distance conveniently accessible by horse. Heavy freight could only be carried by water or rail. The invention of the motor vehicle brought personal mobility to the masses and made rapid freight delivery possible over a much wider area. Today about 90 per cent of inland freight in the United Kingdom is carried by road. Clearly the world cannot revert to the horse-drawn wagon. Can it avoid being locked into congested and polluting ways of transporting people and goods?" },
  { id: 'D', content: "In Europe most cities are still designed for the old modes of transport. Adaptation to the motor car has involved adding ring roads, one-way systems and parking lots. In the United States, more land is assigned to car use than to housing. Urban sprawl means that life without a car is next to impossible. Mass use of motor vehicles has also killed or injured millions of people. Other social effects have been blamed on the car such as alienation and aggressive human behaviour." },
  { id: 'E', content: "A 1993 study by the European Federation for Transport and Environment found that car transport is seven times as costly as rail travel in terms of the external social costs it entails such as congestion, accidents, pollution, loss of cropland and natural habitats, depletion of oil resources, and so on. Yet cars easily surpass trains or buses as a flexible and convenient mode of personal transport. It is unrealistic to expect people to give up private cars in favour of mass transit." },
  { id: 'F', content: "Technical solutions can reduce the pollution problem and increase the fuel efficiency of engines. But fuel consumption and exhaust emissions depend on which cars are preferred by customers and how they are driven. Many people buy larger cars than they need for daily purposes or waste fuel by driving aggressively. Besides, global car use is increasing at a faster rate than the improvement in emissions and fuel efficiency which technology is now making possible." },
  { id: 'G', content: "One solution that has been put forward is the long-term solution of designing cities and neighbourhoods so that car journeys are not necessary - all essential services being located within walking distance or easily accessible by public transport. Not only would this save energy and cut carbon dioxide emissions, it would also enhance the quality of community life, putting the emphasis on people instead of cars. Good local government is already bringing this about in some places. But few democratic communities are blessed with the vision - and the capital - to make such profound changes in modern lifestyles." },
  { id: 'H', content: "A more likely scenario seems to be a combination of mass transit systems for travel into and around cities, with small 'low emission' cars for urban use and larger hybrid or lean burn cars for use elsewhere. Electronically tolled highways might be used to ensure that drivers pay charges geared to actual road use. Better integration of transport systems is also highly desirable - and made more feasible by modern computers. But these are solutions for countries which can afford them. In most developing countries, old cars and old technologies continue to predominate." }
]

const questions = [
  { id: 1, text: "a comparison of past and present transportation methods", correctAnswer: 'C' },
  { id: 2, text: "how driving habits contribute to road problems", correctAnswer: 'F' },
  { id: 3, text: "the relative merits of cars and public transport", correctAnswer: 'E' },
  { id: 4, text: "the writer's prediction on future solutions", correctAnswer: 'H' },
  { id: 5, text: "the increasing use of motor vehicles", correctAnswer: 'A' },
  { id: 6, text: "the impact of the car on city development", correctAnswer: 'D' }
]

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
    answer === questions.find(q => q.id === parseInt(id)).correctAnswer
  ).length

  return (
    <Card className="shadow-lg bg-white">
      <CardContent className="p-6 space-y-6">
        <ScrollArea className="h-[300px] rounded-lg border border-gray-200 p-4">
          <div className="space-y-4 text-sm leading-relaxed">
            {paragraphs.map((para) => (
              <div key={para.id} className="mb-4">
                <h3 className="font-bold mb-2">Paragraph {para.id}</h3>
                <p>{para.content}</p>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="space-y-4">
          <div className="bg-gray-100 border-l-4 border-gray-300 p-4 rounded-r-lg">
            <p className="text-sm text-gray-700">
              Which paragraphs contain the following information? Write the correct letter A-H for each question.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions.map((question) => (
              <div key={question.id} className="flex items-center space-x-2">
                <span className="font-medium w-6">{question.id}.</span>
                <p className="flex-grow">{question.text}</p>
                <div className="flex items-center space-x-2">
                  <Select onValueChange={(value) => handleSelect(question.id, value)}>
                    <SelectTrigger className={`w-[60px] ${
                      showResults 
                        ? answers[question.id] === question.correctAnswer
                          ? 'border-green-500'
                          : 'border-red-500'
                        : ''
                    }`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {paragraphs.map((para) => (
                        <SelectItem key={para.id} value={para.id}>
                          {para.id}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions.map((question) => (
                  <div key={question.id} className="flex items-center space-x-2">
                    {answers[question.id] === question.correctAnswer ? (
                      <CheckCircle className="text-green-500" />
                    ) : (
                      <XCircle className="text-red-500" />
                    )}
                    <span className="font-semibold">{question.id}:</span>
                    <span className={answers[question.id] === question.correctAnswer ? "text-green-600" : "text-red-600"}>
                      Your answer: {answers[question.id] || "(no answer)"}
                    </span>
                    {answers[question.id] !== question.correctAnswer && (
                      <span className="text-gray-600">
                        Correct: {question.correctAnswer}
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