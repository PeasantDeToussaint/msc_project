import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from 'lucide-react'

const correctAnswers = {
  '1': '36.5',
  '2': '50',
  '3': '54000',
  '4': '29.7 kilometres',
  '5': '20-30',
  '6': '1200'
}

const initialAnswers = {
  '1': '', '2': '', '3': '', '4': '', '5': '', '6': ''
}

export default function TableCompletionQuestion() {
  const [answers, setAnswers] = useState(initialAnswers)
  const [showResults, setShowResults] = useState(false)

  const handleInputChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }))
  }

  const checkAnswers = () => {
    setShowResults(true)
  }

  const resetQuiz = () => {
    setAnswers(initialAnswers)
    setShowResults(false)
  }

  const score = Object.entries(answers).filter(([id, answer]) => 
    answer.toLowerCase().trim() === correctAnswers[id].toLowerCase()
  ).length

  return (
    <Card className="shadow-lg bg-white">
      <CardContent className="p-6 space-y-8">
        <ScrollArea className="h-[300px] rounded-lg border border-gray-200 p-4">
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              On 15 February 2013, just after dawn the sleepy Russian city of Chelyabinsk was woken by the biggest meteor strike on Earth in over l00 years. Several people videoed the meteor as it crashed through Earth's atmosphere, passing close above the city and giving scientists vital clues as to where it had come from and how it had travelled to Earth. To the people of Chelyabinsk, the meteor shone 30 times brighter than the sun and had 20-30 times more energy than the atomic bomb dropped on Hiroshima. The meteor did not hit the ground, but due to its enormous speed exploded 29.7 kilometres above the ground, producing a bright flash, a cloud of hot dust and gas, many smaller fragments of meteor and a powerful shock wave. The latter was so strong that it knocked people off their feet and blew out the windows of homes, shops and factories. 1,500 people went to hospital with injuries indirectly caused by the strike, but matters could have been far worse if the meteor had made contact with the Earth.
            </p>
            <p>
              The meteor was not an uncommon rock. From studying videos of the meteor's flight, scientists have concluded that it originated in the asteroid belt located between the orbits of Mars and Jupiter. At the time it entered Earth's atmosphere, it weighed between 12,000 and 13,000 metric tonnes and was I0 metres in diameter. It crashed through the upper atmosphere at around 19 kilometres a second-above 50 times the speed of sound, facturing at an altitude of between 45 and 50 kilometres such events happen on average every I0 or so years, mainly over oceans or unpopulated areas. This time the strike was over a city and observed by many people, reminding us how common these occurrences are.
            </p>
            <p>
              A meteor strike has several phases. Moving through space, a meteor's temperature can be around -100 C. It travels around 5 kilometres per second until Earth's gravity accelerates it to 1 7 kilometres a second. It begins to encounter the atmosphere 140 kilometres above the Earth but there is little air resistance until about three seconds later, when it reaches 100 kilometres above the ground. At this point the air becomes dense, causing the meteor to glow as the material on its surface melts. The mix of burning gas and dust creates a fireball as the meteor loses 3 to 6 millimeters of surface mass per second as it is heated to over 1800 C. The rate of loss of material through heat is so rapid that the core temperature of the meteor is still very low while at the same time a tail of vaporised dust and gas becomes visible. These tails can often be seen for up to 45 minutes and may be followed by a sonic boom as the meteor crashes through the sound barrier. During its flight to the Earth, the meteor slows down by 70 per cent and it is during this period that it may fracture and split. At this point some meteors explode in a violent airburst while others enter dark flight - the period when the meteor slows down so much that it stops burning and it falls to the ground as a cold rock.
            </p>
            <p>
              The Chelyabinsk airburst left only a few large pieces of the meteor: one rock was recovered near the town of Timiyazevskiy, another fell on a house in Deputatskiy, and the largest piece was found by divers at the bottom of Lake Chebarkul. The meteor was the largest to crash to Earth since I908, when a meteor exploded over an area near the Tunguska River in Siberia. Although information about the event is scarce, the theory most scientists share is that an asteroid around 36.5 metres in diameter and travelling at 54,000 kilometres per hour entered the atmosphere above Russia. It exploded in an airburst at 28,000 feet, releasing energy equal to about 185 Hiroshima atomic bombs and flattening trees across an area of 800 square miles. Airbursts the size of Tunguska are estimated to occur every 1,200 years on average. But following the Chelyabinsk meteor, scientists now think the risk of similar objects hitting our planet may be ten times greater than thought previously.
            </p>
          </div>
        </ScrollArea>

        <div className="space-y-4">
          <div className="bg-gray-100 border-l-4 border-gray-300 p-4 rounded-r-lg">
            <p className="text-sm text-gray-700">
              Complete the table below. Choose <span className="font-semibold">NO MORE THAN TWO NUMBERS AND ONE WORD</span> from the passage for each answer.
            </p>
          </div>
          <Table className="border-2">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-center font-semibold">The Chelyabinsk meteor strike</TableHead>
                <TableHead className="text-center font-semibold">The Tunguska meteor strike</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["The meteor was 10 metres in diameter.", "The meteor was [1] metres in diameter."],
                ["It travelled [2] times faster than the speed of sound.", "It entered the atmosphere above Russia at about [3] per hour."],
                ["It exploded [4] above the Earth's surface.", "It exploded 28,000 feet above the earth's surface."],
                ["It released [5] times more energy than the Hiroshima atomic bomb.", "It released 185 times more energy than the Hiroshima atomic bomb."],
                ["Meteor strikes of this kind occur on average every 10 years.", "Meteor strikes of this kind occur on average every [6] years."]
              ].map((row, index) => (
                <TableRow key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex} className="p-2">
                      {cell.includes("[") ? (
                        <div className="flex items-center space-x-2">
                          <span>{cell.split("[")[0]}</span>
                          <Input 
                            id={cell.match(/\[(\d+)\]/)?.[1] || ""}
                            value={answers[cell.match(/\[(\d+)\]/)?.[1] || ""]}
                            onChange={(e) => handleInputChange(cell.match(/\[(\d+)\]/)?.[1] || "", e.target.value)}
                            className={`w-32 inline-block ${
                              showResults 
                                ? answers[cell.match(/\[(\d+)\]/)?.[1] || ""].toLowerCase().trim() === correctAnswers[cell.match(/\[(\d+)\]/)?.[1] || ""].toLowerCase()
                                  ? 'border-green-500'
                                  : 'border-red-500'
                                : 'border-blue-300 focus:border-blue-500'
                            }`}
                          />
                          <span>{cell.split("]")[1]}</span>
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
                Score: {score} / 6
              </div>
            )}
          </div>
          {showResults && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Results:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(correctAnswers).map(([id, answer]) => (
                  <div key={id} className="flex items-center space-x-2">
                    {answers[id].toLowerCase().trim() === answer.toLowerCase() ? (
                      <CheckCircle className="text-green-500" />
                    ) : (
                      <XCircle className="text-red-500" />
                    )}
                    <span className="font-semibold">{id}:</span>
                    <span className={answers[id].toLowerCase().trim() === answer.toLowerCase() ? "text-green-600" : "text-red-600"}>
                      Your answer: {answers[id] || "(no answer)"}
                    </span>
                    {answers[id].toLowerCase().trim() !== answer.toLowerCase() && (
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
      </CardContent>
    </Card>
  )
}