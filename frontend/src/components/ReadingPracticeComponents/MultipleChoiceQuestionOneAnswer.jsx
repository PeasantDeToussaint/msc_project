import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from 'lucide-react'

const passage = `[Note: This is an extract from a Part 1 text about older people in the workforce.]
© The Economist Newspaper Limited, London, 1999

The general assumption is that older workers are paid more in spite of, rather than because of, their productivity. That might partly explain why, when employers are under pressure to cut costs, they persuade a 55-year old to take early retirement. Take away seniority-based pay scales, and older workers may become a much more attractive employment proposition. But most employers and many workers are uncomfortable with the idea of reducing someone's pay in later life – although manual workers on piece-rates often earn less as they get older. So retaining the services of older workers may mean employing them in different ways.

One innovation was devised by IBM Belgium. Faced with the need to cut staff costs, and having decided to concentrate cuts on 55 to 60-year olds, IBM set up a separate company called Skill Team, which re-employed any of the early retired who wanted to go on working up to the age of 60. An employee who joined Skill Team at the age of 55 on a five-year contract would work for 58% of his time, over the full period, for 88% of his last IBM salary. The company offered services to IBM, thus allowing it to retain access to some of the intellectual capital it would otherwise have lost.

The best way to tempt the old to go on working may be to build on such 'bridge' jobs: part-time or temporary employment that creates a more gradual transition from full-time work to retirement. Studies have found that, in the United States, nearly half of all men and women who had been in full-time jobs in middle age moved into such 'bridge' jobs at the end of their working lives. In general, it is the best-paid and worst-paid who carry on working. There seem to be two very different types of bridge job-holder – those who continue working because they have to and those who continue working because they want to, even though they could afford to retire.

If the job market grows more flexible, the old may find more jobs that suit them. Often, they will be self-employed. Sometimes, they may start their own businesses: a study by David Storey of Warwick University found that in Britain 70% of businesses started by people over 55 survived, compared with an overall national average of only 19%. But whatever pattern of employment they choose, in the coming years the skills of these 'grey workers' will have to be increasingly acknowledged and rewarded.`

const questions = [
  {
    id: 1,
    text: "In paragraph one, the writer suggests that companies could consider",
    options: [
      { id: 'A', text: "abolishing pay schemes that are based on age." },
      { id: 'B', text: "avoiding pay that is based on piece-rates." },
      { id: 'C', text: "increasing pay for older workers." },
      { id: 'D', text: "equipping older workers with new skills." },
    ],
    correctAnswer: 'A'
  },
  {
    id: 2,
    text: "Skill Team is an example of a company which",
    options: [
      { id: 'A', text: "offers older workers increases in salary." },
      { id: 'B', text: "allows people to continue working for as long as they want." },
      { id: 'C', text: "allows the expertise of older workers to be put to use." },
      { id: 'D', text: "treats older and younger workers equally." },
    ],
    correctAnswer: 'C'
  },
  {
    id: 3,
    text: "According to the writer, 'bridge' jobs",
    options: [
      { id: 'A', text: "tend to attract people in middle-salary ranges." },
      { id: 'B', text: "are better paid than some full-time jobs." },
      { id: 'C', text: "originated in the United States." },
      { id: 'D', text: "appeal to distinct groups of older workers." },
    ],
    correctAnswer: 'D'
  },
  {
    id: 4,
    text: "David Storey's study found that",
    options: [
      { id: 'A', text: "people demand more from their work as they get older." },
      { id: 'B', text: "older people are good at running their own businesses." },
      { id: 'C', text: "an increasing number of old people are self-employed." },
      { id: 'D', text: "few young people have their own businesses." },
    ],
    correctAnswer: 'B'
  }
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

  const score = questions.filter(q => answers[q.id] === q.correctAnswer).length

  return (
    <Card className="shadow-lg bg-white">
      <CardContent className="p-6 space-y-6">
        <ScrollArea className="h-[400px] rounded-lg border border-gray-200 p-4">
          <div className="space-y-4 text-sm leading-relaxed">
            <h2 className="text-xl font-bold mb-4">IELTS Academic Reading: Multiple Choice (one answer)</h2>
            <p className="whitespace-pre-wrap">{passage}</p>
          </div>
        </ScrollArea>

        <div className="space-y-4">
          <div className="bg-gray-100 border-l-4 border-gray-300 p-4 rounded-r-lg">
            <p className="text-sm text-gray-700">
              Questions 1 – 4
            </p>
            <p className="text-sm text-gray-700">
              Choose the correct letter, A, B, C or D.
            </p>
            <p className="text-sm text-gray-700">
              Write the correct letter in boxes 1-4 on your answer sheet.
            </p>
          </div>
          <div className="space-y-6">
            {questions.map((question) => (
              <div key={question.id} className="space-y-2">
                <h3 className="font-medium">{question.id}. {question.text}</h3>
                <RadioGroup onValueChange={(value) => handleSelect(question.id, value)} value={answers[question.id] || ""}>
                  {question.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value={option.id} 
                        id={`q${question.id}-${option.id}`}
                        className={`${
                          showResults 
                            ? option.id === question.correctAnswer
                              ? 'border-green-500'
                              : answers[question.id] === option.id
                                ? 'border-red-500'
                                : ''
                            : ''
                        }`}
                      />
                      <Label htmlFor={`q${question.id}-${option.id}`}>{option.id}. {option.text}</Label>
                    </div>
                  ))}
                </RadioGroup>
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
                {questions.map((question) => (
                  <div key={question.id} className="flex items-start space-x-2">
                    {answers[question.id] === question.correctAnswer ? (
                      <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="text-red-500 mt-1 flex-shrink-0" />
                    )}
                    <div>
                      <span className="font-semibold">{question.id}. {question.text}</span>
                      <div className={answers[question.id] === question.correctAnswer ? "text-green-600" : "text-red-600"}>
                        Your answer: {answers[question.id] ? `${answers[question.id]}. ${question.options.find(o => o.id === answers[question.id])?.text}` : "(no answer)"}
                      </div>
                      {answers[question.id] !== question.correctAnswer && (
                        <div className="text-gray-600">
                          Correct answer: {question.correctAnswer}. {question.options.find(o => o.id === question.correctAnswer)?.text}
                        </div>
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