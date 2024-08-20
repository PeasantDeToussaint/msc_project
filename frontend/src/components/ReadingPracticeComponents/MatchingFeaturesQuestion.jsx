'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from 'lucide-react'

const matchingItems = [
  { id: "black_powder", text: "black powder", correctAnswer: "A" },
  { id: "rocket_arrows", text: "rocket-propelled arrows for fighting", correctAnswer: "A" },
  { id: "war_weapons", text: "rockets as war weapons", correctAnswer: "B" },
  { id: "rocket_launcher", text: "the rocket launcher", correctAnswer: "E" },
]

const matchingOptions = [
  { value: "A", label: "the Chinese" },
  { value: "B", label: "the Indians" },
  { value: "C", label: "the British" },
  { value: "D", label: "the Arabs" },
  { value: "E", label: "the Americans" },
]

const initialAnswers = {}

export default function Component() {
  const [answers, setAnswers] = useState(initialAnswers)
  const [showResults, setShowResults] = useState(false)

  const handleSelect = (itemId, value) => {
    setAnswers(prev => ({ ...prev, [itemId]: value }))
  }

  const checkAnswers = () => {
    setShowResults(true)
  }

  const resetQuiz = () => {
    setAnswers(initialAnswers)
    setShowResults(false)
  }

  const score = matchingItems.filter(item => answers[item.id] === item.correctAnswer).length

  return (
    <Card className="shadow-lg bg-white">
      <CardContent className="p-6 space-y-6">
        <ScrollArea className="h-[300px] rounded-lg border border-gray-200 p-4">
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              The Chinese invented gunpowder, and the first record of a written formula for gunpowder appears in the 11th century Song Dynasty text, Wujing Zongyao. This discovery led to the invention of fireworks and the eventual development of the gun. After the invention of gunpowder, the Chinese seem to have made some use of projectile weapons, including rocket-propelled arrows for fighting.
            </p>
            <p>
              The Mongols made extensive use of the fire arrows and rockets during their campaigns in China and Europe. After Europe adopted gunpowder weapons, their use spread rapidly to the Middle East, India, and Korea. The earliest reliable evidence of the use of rockets as weapons is found in Jodhpur in India, AD 1300. The first rocket-propelled weapons to be used in battle were the Mysorean rockets of India, developed by Hyder Ali in the 18th century.
            </p>
            <p>
              The British then took an interest in the technology and developed it further during the 19th century. William Congreve created a rocket design that was used effectively during the Napoleonic Wars and the War of 1812. Rockets were generally very inaccurate until the 20th century, when new designs improved their accuracy.
            </p>
            <p>
              Modern rockets were born when Robert H. Goddard attached a supersonic (de Laval) nozzle to a liquid-fueled rocket engine. These nozzles turn the hot gas from the combustion chamber into a cooler, hypersonic, highly directed jet of gas, more than doubling the thrust and raising the engine efficiency from 2% to 64%. His work directly influenced the development of the V-2 rocket in Germany.
            </p>
            <p>
              During World War II, rockets were used extensively as weapons, particularly by the Germans with their V-2 rocket. However, it was the Americans who developed the rocket launcher, also known as the "Bazooka," which proved to be a highly effective anti-tank weapon. After the war, the technology continued to develop, leading to the space race and the eventual landing on the moon.
            </p>
          </div>
        </ScrollArea>

        <Separator />

        <div className="space-y-4">
          <div className="bg-gray-100 border-l-4 border-gray-300 p-4 rounded-r-lg">
            <p className="text-sm text-gray-700">
              Look at the following items and the list of groups below.
              Match each item with the group which first invented or used them.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchingItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Label htmlFor={`item-${item.id}`} className="w-1/2 font-medium">
                  {item.text}
                </Label>
                <div className="flex items-center space-x-2">
                  <Select onValueChange={(value) => handleSelect(item.id, value)}>
                    <SelectTrigger 
                      id={`item-${item.id}`} 
                      className={`w-[200px] ${
                        showResults 
                          ? answers[item.id] === item.correctAnswer
                            ? 'border-green-500'
                            : 'border-red-500'
                          : ''
                      }`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {matchingOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.value}: {option.label}
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
                Score: {score} / {matchingItems.length}
              </div>
            )}
          </div>
          {showResults && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Results:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchingItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    {answers[item.id] === item.correctAnswer ? (
                      <CheckCircle className="text-green-500" />
                    ) : (
                      <XCircle className="text-red-500" />
                    )}
                    <span className="font-semibold">{item.text}:</span>
                    <span className={answers[item.id] === item.correctAnswer ? "text-green-600" : "text-red-600"}>
                      Your answer: {matchingOptions.find(option => option.value === answers[item.id])?.label || "(no answer)"}
                    </span>
                    {answers[item.id] !== item.correctAnswer && (
                      <span className="text-gray-600">
                        Correct: {matchingOptions.find(option => option.value === item.correctAnswer)?.label}
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