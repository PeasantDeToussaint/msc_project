'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from 'lucide-react'

const sentenceCompletionItems = [
  { id: "collisions", text: "During World War One, Halifax Harbour was unable to handle the increased shipping traffic properly, and there were numerous __________.", correctAnswer: "collisions" },
  { id: "channel", text: "The Imo was not in the correct _________and travelling too fast.", correctAnswer: "channel" },
  { id: "thousands", text: "___________of people were watching the burning ship when it exploded.", correctAnswer: "thousands" },
  { id: "one-fifth", text: "The Halifax Explosion had about ____________of the power of the Hiroshima bomb.", correctAnswer: "one-fifth" },
  { id: "trapped", text: "Freezing weather brought by a blizzard caused the death of some survivors who were __________under collapsed buildings.", correctAnswer: "trapped" },
]

const initialAnswers = {}

export default function Component() {
  const [answers, setAnswers] = useState(initialAnswers)
  const [showResults, setShowResults] = useState(false)

  const handleInputChange = (itemId, value) => {
    setAnswers(prev => ({ ...prev, [itemId]: value }))
  }

  const checkAnswers = () => {
    setShowResults(true)
  }

  const resetQuiz = () => {
    setAnswers(initialAnswers)
    setShowResults(false)
  }

  const score = sentenceCompletionItems.filter(item => 
    answers[item.id]?.toLowerCase().trim() === item.correctAnswer.toLowerCase()
  ).length

  return (
    <Card className="shadow-lg bg-white">
      <CardContent className="p-6 space-y-6">
        <ScrollArea className="h-[300px] rounded-lg border border-gray-200 p-4">
          <div className="space-y-4 text-sm leading-relaxed">
            <h2 className="text-lg font-semibold">The Halifax Explosion</h2>
            <p>
              Before the atomic bomb was dropped on Hiroshima in 1945, the largest-ever non-natural explosion had taken place in 1917 in the eastern Canadian port city of Halifax. With the outbreak of World War I, Halifax was effectively transformed into a boomtown. Convoys gathered weekly in Bedford Basin (the north-western end of Halifax Harbour) in order to traverse the Atlantic, and Halifax Harbour became heavy with vessels of one variety or another. This spike in boat traffic was not dealt with efficiently, and collisions became almost normal.
            </p>
            <p>
              On December 1st, 1917, the French vessel Mont Blanc left New York in order to join a convoy in Halifax after being loaded with 226,797 kilograms of TNT (an explosive), 223,188 kilograms of benzol (a type of gasoline), 1,602,519 kilograms of wet picric acid (an explosive), and 544,311 kilograms of dry picric acid (another explosive). On December 6th, the Mont Blanc was ushered into Halifax's harbour after the U-boat nets had been raised.
            </p>
            <p>
              At the same time, the cargoless Norwegian ship, Imo, left Bedford Basin en route to New York in order to pick up relief items for transport to war-torn Belgium. Imo was behind schedule and attempting to remedy that. She passed a boat on the wrong side before sending a tugboat retreating to port. By the time she reached the Narrows, she was in the wrong channel and going too fast. The Mont Blanc sounded her whistle, but the Imo sounded back twice, refusing to alter course. At the last moment, the Mont Blanc veered, and the Imo reversed, but it was too late. From the gash formed in the French boat's hull seeped a noxious spiral of oily, orange-dappled smoke. Mont Blanc's crew rowed to shore on the Dartmouth side, but no one could decipher their warnings. Their fiery vessel then casually drifted toward the Halifax side where it came to rest against one of the piers.
            </p>
            <p>
              This spectacle drew thousands of onlookers. People crowded docks and windows filled with curious faces. As many as 1,600 died instantly when the boat exploded. Around 9,000 were injured, 6,000 seriously so. Approximately 12,000 buildings were severely damaged; virtually every building in town was damaged to some extent; 1,630 were rendered nonexistent. Around 6,000 people were made homeless, and 25,000 people (half the population) were left without suitable housing.
            </p>
            <p>
              The Halifax Explosion, as it became known, was the largest manmade detonation to date, approximately one-fifth the ferocity of the bomb later dropped on Hiroshima. It sent up a column of smoke reckoned to be 7,000 metres in height. It was felt more than 480 kilometres away. It flung a ship gun barrel some 5.5 kilometres, and part of an anchor, which weighed 517 kilograms, around 3 kilometres. The blast absolutely flattened a district known as Richmond. It also caused a tsunami that saw a wave 18 metres above the high-water mark depositing the Imo onto the shore of the Dartmouth side. The pressure wave of air that was produced snapped trees, bent iron rails, and grounded ships. That evening, a blizzard commenced, and it would continue until the next day, leaving 40 centimetres of snow in its wake. Consequently, many of those trapped within collapsed structures died of exposure. Historians put the death toll of the Halifax Explosion at approximately 2,000.
            </p>
          </div>
        </ScrollArea>

        <Separator />

        <div className="space-y-4">
          <div className="bg-gray-100 border-l-4 border-gray-300 p-4 rounded-r-lg">
            <p className="text-sm text-gray-700">
              Complete the sentences using NO MORE THAN THREE WORDS from the passage for each answer.
            </p>
          </div>
          <div className="space-y-4">
            {sentenceCompletionItems.map((item, index) => (
              <div key={item.id} className="space-y-2">
                <Label htmlFor={`item-${item.id}`} className="font-medium">
                  {index + 1}. {item.text}
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id={`item-${item.id}`}
                    value={answers[item.id] || ''}
                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                    className={`w-[200px] ${
                      showResults 
                        ? answers[item.id]?.toLowerCase().trim() === item.correctAnswer.toLowerCase()
                          ? 'border-green-500'
                          : 'border-red-500'
                        : ''
                    }`}
                    maxLength={20}
                  />
                  {showResults && (
                    answers[item.id]?.toLowerCase().trim() === item.correctAnswer.toLowerCase() ? (
                      <CheckCircle className="text-green-500" />
                    ) : (
                      <XCircle className="text-red-500" />
                    )
                  )}
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
                Score: {score} / {sentenceCompletionItems.length}
              </div>
            )}
          </div>
          {showResults && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Results:</h3>
              <div className="space-y-2">
                {sentenceCompletionItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-2">
                    {answers[item.id]?.toLowerCase().trim() === item.correctAnswer.toLowerCase() ? (
                      <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="text-red-500 mt-1 flex-shrink-0" />
                    )}
                    <div>
                      <p className="font-semibold">{item.text}</p>
                      <p className={answers[item.id]?.toLowerCase().trim() === item.correctAnswer.toLowerCase() ? "text-green-600" : "text-red-600"}>
                        Your answer: {answers[item.id] || "(no answer)"}
                      </p>
                      {answers[item.id]?.toLowerCase().trim() !== item.correctAnswer.toLowerCase() && (
                        <p className="text-gray-600">
                          Correct answer: {item.correctAnswer}
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