'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from 'lucide-react'

const questions = [
  { id: 1, text: "Chemically speaking, the act of yawning could be comparable with" },
  { id: 2, text: "A \"contagious\" yawn theory involves" },
  { id: 3, text: "One popular theory posits that yawning can help" },
  { id: 4, text: "Neurosurgeons would believe that yawning triggers" },
  { id: 5, text: "Scientists disagree on" },
  { id: 6, text: "Yawning could be a way to control" },
  { id: 7, text: "Yawning can occur without" },
]

const endings = [
  { id: 'A', text: "chemical responses in the brain" },
  { id: 'B', text: "temperature levels in the body" },
  { id: 'C', text: "over five chemicals in the brain" },
  { id: 'D', text: "natural responses to hunger or emotions" },
  { id: 'E', text: "ways to fund research on yawning" },
  { id: 'F', text: "animals reacting to potential death" },
  { id: 'G', text: "predators feeling tired" },
  { id: 'H', text: "levels of importance to the topic of yawning" },
  { id: 'I', text: "overt levels of strength or control" },
  { id: 'J', text: "people increase their levels of alertness" },
]

const correctAnswers = {
  1: 'D', 2: 'F', 3: 'J', 4: 'A', 5: 'H', 6: 'B', 7: 'I'
}

const passage = `When was the last time you yawned? If you are finding it hard to remember, consider yourself just the same as every other person living in Australia! Not paying attention to the frequency of yawning is understandable, as it is one of the earliest reactions that is instinctively learned. It is made evident, for example, during a newborn's first stages of life, but it has also been noticed in fetuses at a gestational age of a mere twelve weeks! Based on an Australian study completed in 2008, yawning is considered to be one of the most basic functions our body can complete without much warning or strength. In some cases, it can catch us off guard and seem to appear out of nowhere. For this reason, some believe that yawning is comparable to other basic acts, such as crossing one's legs or rubbing an itchy eye. In other words, it is so mundane that people hardly notice when it happens, nor do they prepare for its occurrences.

Even though yawning is considered to be one of the most basic functions in our daily routines, sufficient research still has not been done to answer the question on why yawning occurs. One reason for this is because most scientists do not believe that yawning is worthy of additional research, since it is thought of as a rudimentary function. As such, those who are against researching this phenomenon believe that it will have little to no impact on the scientific communities. Moreover, there have not been any documented instances in which yawning was considered dangerous or a cause of death. These scientists believe that if yawning is not a potential peril to human life, its basic functions are not worth exploring. Others, however, believe that even the most basic functions can shed light on how humans process information and act. Proponents of this idea argue that there could be a more important and deeper physiological significance behind yawning.  

Not only is there a heightened debate regarding the importance of studying yawning, but there are also different speculations regarding why people yawn. The most well-known theory is that yawning helps people increase their levels of alertness. For instance, a university student sitting in a less-than-thrilling lecture may yawn in order to increase blood flow and intake more oxygen to the brain. This is just one reason why yawning has been associated with falling asleep. Of course, people are not actively thinking about the mechanics behind this process when yawning occurs. That is, this natural response to increasing one's blood flow is rooted in our subconscious, and always has been. When shifting this scientific explanation to animals, the idea behind the process changes slightly. A perfect example of this is the "contagious" yawn theory, dating back to animals centuries ago. In short, an animal would instinctively yawn in order to alert other members of the herd to a possible predator. Yawning was not necessarily attached to alertness in terms of "attention", but rather, making others aware of potential dangers. 

Despite these interesting theories dating back centuries, other scientists believe that yawning is nothing more than a type of temperature regulator of the body, similar to the air conditioner dials in one's car. In other words, a yawning reaction is triggered when one feels overheated, which acts as a "cool-down method" for the body. In most cases, this reaction is involuntary, meaning that a person is not completely aware that yawning is changing his or her body temperature.  On a different note, the study of neuroscience, in particular, posits that yawning is just another way to precipitate a chemical response in the brain. Consequently, it is believed that chemicals, such as serotonin and dopamine, could possibly cause yawning. If proven to be true, this would mean that yawning is similar to natural triggers, such as hunger or happiness. The main difference between these three examples, then, would be the amount of research and attention that have been paid to understanding their specific causes and effects.

Not only is yawning an interesting topic in the field of science, but it is equally a divisive topic as well. Based on current trends, scientists will most likely not soon agree on potential reasons for yawning, nor will they agree on the value of researching it. During Australia's most recent "International Conference on Human Interaction", for example, a panel discussion including scientists across a variety of sectors discussed which future projects were worthy of receiving monetary aid. Similar to years past, neuroscientists presented their research showcasing how possible chemical imbalances could lead to a higher frequency of yawning in adolescents. Although the project was not chosen to receive monetary assistance for further study, most agreed that it was able to bring attention to the interdisciplinary approach that is surely needed when understanding the causes and effects of yawning. While the future of its research is unclear, we can rest assured that yawning presents an intriguing case of natural behavior in both humans and animals.`

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
    answer === correctAnswers[id]
  ).length

  return (
    <Card className="shadow-lg bg-white">
      <CardContent className="p-6 space-y-6">
        <ScrollArea className="h-[400px] rounded-lg border border-gray-200 p-4">
          <div className="space-y-4 text-sm leading-relaxed">
            <h2 className="text-xl font-bold mb-4">IELTS Reading: Matching Sentence Endings</h2>
            <p>{passage}</p>
          </div>
        </ScrollArea>

        <div className="space-y-4">
          <div className="bg-gray-100 border-l-4 border-gray-300 p-4 rounded-r-lg">
            <p className="text-sm text-gray-700">
              Questions 1-7
            </p>
            <p className="text-sm text-gray-700">
              Complete each sentence with the correct ending, A-J.
            </p>
            <p className="text-sm text-gray-700">
              NB You may use any letter more than once.
            </p>
          </div>
          <div className="space-y-4">
            {questions.map((question) => (
              <div key={question.id} className="flex items-center space-x-2">
                <span className="font-medium w-96">{question.id}. {question.text}</span>
                <Select onValueChange={(value) => handleSelect(question.id, value)} value={answers[question.id] || ""}>
                  <SelectTrigger className={`w-full ${
                    showResults 
                      ? answers[question.id] === correctAnswers[question.id]
                        ? 'border-green-500'
                        : 'border-red-500'
                      : ''
                  }`}>
                    <SelectValue placeholder="Select ending" />
                  </SelectTrigger>
                  <SelectContent>
                    {endings.map((ending) => (
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
              <ScrollArea className="h-[200px] rounded-lg border border-gray-200 p-4">
                <div className="space-y-2">
                  {questions.map((question) => (
                    <div key={question.id} className="flex items-start space-x-2">
                      {answers[question.id] === correctAnswers[question.id] ? (
                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      ) : (
                        <XCircle className="text-red-500 mt-1 flex-shrink-0" />
                      )}
                      <div>
                        <span className="font-semibold">{question.id}. {question.text}</span>
                        <div className={answers[question.id] === correctAnswers[question.id] ? "text-green-600" : "text-red-600"}>
                          Your answer: {answers[question.id] ? `${answers[question.id]}. ${endings.find(e => e.id === answers[question.id])?.text}` : "(no answer)"}
                        </div>
                        {answers[question.id] !== correctAnswers[question.id] && (
                          <div className="text-gray-600">
                            Correct answer: {correctAnswers[question.id]}. {endings.find(e => e.id === correctAnswers[question.id])?.text}
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