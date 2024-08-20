import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from 'lucide-react'

const passage = `A new report from the World Institute for Development Economics Research of the United Nations University shows that wealth creation is remarkable, one might say, criminally, unequal. Follow this hierarchy at the top of the wealth pyramid: the richest 1 percent of adults alone owned 40 percent of global assets in the year 2000; the richest 2 percent owned more than half of global household wealth, and the richest 10 percent of adults accounted for 85% of the world total. That leaves very little for the remaining 90 percent of the global population. Could it be any worse? Yes, the rich are still getting richer, more millionaires are becoming billionaires.

As to the world's lower class: the bottom half of the world's adult population owned barely 1 percent of global wealth, defined as net worth: the value of physical and financial assets fewer debts. Over a billion poor people subsist on less than one dollar a day. Every day, according to UNICEF, 30,000 children die due to poverty - that's over 10 million children killed by poverty every year! Global economic apartheid is killing people.

Here are data showing some of the variations among nations. Average wealth amounted to $144,000 per person in the U.S. in 2000, not as good as the $181,000 in Japan, but better than most others: $127,000 for the U.K., $70,000 for Denmark, $37,000 for New Zealand, $1,400 in Indonesia and $1,100 in India. Averages, of course, are very deceiving.

The statistical measure of inequality is the Gini value, which measures inequality on a scale from zero (total equality) to one (complete inequality). For income, it ranges from .35 to .45 in most countries. Wealth inequality is usually much higher, typically between .65 and .75. This reflects the greater difficulty in accumulating wealth (capital) than increasing income. Two high wealth economies, Japan and the United States show very different patterns of wealth inequality, with Japan having a low wealth Gini of .55 and the U.S. having around .80. The incomes of the top fifth of the Japanese population are only three times that of the bottom fifth, compared to nine times in the U.S. Japan has little economic apartheid compared to the U.S., yet both countries have a huge number of wealthy people. Of the wealthiest 10 percent in the world, 25 percent are American, and 20 percent are Japanese. These two countries are even stronger among the richest 1 percent of individuals in the world, with 37 percent residing in the U.S. and 27 percent in Japan. The point is that despite high numbers of very wealthy people, economic apartheid is absent in Japan and abysmal in the U.S.

We can explain the difference between Japan and the U.S. People can save and accumulate wealth for future economic security or can borrow and spend like mad to accumulate possessions. According to a 2006 report, only 41 percent of American families save regularly, making wealth creation difficult. America's national savings rate - which includes corporate savings and government budget deficits - is only about 13.6% of gross domestic product, compared to 25 percent in Japan.

U.S. economic apartheid shows that a self-proclaimed great democracy with considerable personal freedom can risk deep social instability from class warfare as it approaches a two-class system. We need to see economic apartheid as lethal and repulsive as racial apartheid.`

const notes = [
  { id: 1, text: "According to a UN report, the world's wealth distribution is drastically", answer: "unequal" },
  { id: 2, text: "In 2000, the wealthiest 1% had 40% of global wealth, while 10% owned", answer: "85%" },
  { id: 3, text: "In contrast, just 1% of riches was shared by the", answer: "bottom half" },
  { id: 4, text: "Poverty causes the death of more than", answer: "10 million" },
  { id: 5, text: "Inequality is measured in terms of", answer: "Gini value" },
  { id: 6, text: "Japan has less", answer: "economic apartheid" },
  { id: 7, text: "The U.S. example indicates that more", answer: "personal freedom" },
]

export default function Component() {
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

  const score = notes.filter(note => 
    answers[note.id]?.toLowerCase().trim() === note.answer.toLowerCase()
  ).length

  return (
    <Card className="shadow-lg bg-white">
      <CardContent className="p-6 space-y-6">
        <ScrollArea className="h-[400px] rounded-lg border border-gray-200 p-4">
          <div className="space-y-4 text-sm leading-relaxed">
            <h2 className="text-xl font-bold mb-4">IELTS Academic Reading: Note Completion</h2>
            <p className="whitespace-pre-wrap">{passage}</p>
          </div>
        </ScrollArea>

        <div className="space-y-4">
          <div className="bg-gray-100 border-l-4 border-gray-300 p-4 rounded-r-lg">
            <p className="text-sm text-gray-700">
              Complete the notes below.
            </p>
            <p className="text-sm text-gray-700">
              Write NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage for each answer.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Global Wealth Distribution</h3>
            <div className="space-y-2">
              <p>According to a UN report, the world's wealth distribution is drastically <Input
                value={answers[1] || ''}
                onChange={(e) => handleInputChange(1, e.target.value)}
                className={`w-32 inline-block mx-1 ${showResults ? (answers[1]?.toLowerCase().trim() === notes[0].answer.toLowerCase() ? 'border-green-500' : 'border-red-500') : ''}`}
              />.</p>
              <p>In 2000, the wealthiest 1% had 40% of global wealth, while 10% owned <Input
                value={answers[2] || ''}
                onChange={(e) => handleInputChange(2, e.target.value)}
                className={`w-32 inline-block mx-1 ${showResults ? (answers[2]?.toLowerCase().trim() === notes[1].answer.toLowerCase() ? 'border-green-500' : 'border-red-500') : ''}`}
              />.</p>
              <p>In contrast, just 1% of riches was shared by the <Input
                value={answers[3] || ''}
                onChange={(e) => handleInputChange(3, e.target.value)}
                className={`w-32 inline-block mx-1 ${showResults ? (answers[3]?.toLowerCase().trim() === notes[2].answer.toLowerCase() ? 'border-green-500' : 'border-red-500') : ''}`}
              />.</p>
              <p>More than a billion people survive on less than a dollar daily.</p>
              <p>Poverty causes the death of more than <Input
                value={answers[4] || ''}
                onChange={(e) => handleInputChange(4, e.target.value)}
                className={`w-32 inline-block mx-1 ${showResults ? (answers[4]?.toLowerCase().trim() === notes[3].answer.toLowerCase() ? 'border-green-500' : 'border-red-500') : ''}`}
              /> children annually.</p>
              <p>Wealth imbalance among nations:</p>
              <p>In 2000, per capita wealth in Japan and America were $181,000 and $ 144,000 respectively, but a mere $1100 in India.</p>
              <p>Inequality is measured in terms of <Input
                value={answers[5] || ''}
                onChange={(e) => handleInputChange(5, e.target.value)}
                className={`w-32 inline-block mx-1 ${showResults ? (answers[5]?.toLowerCase().trim() === notes[4].answer.toLowerCase() ? 'border-green-500' : 'border-red-500') : ''}`}
              />, which ranges from 0 to 1.</p>
              <p>Japan has less <Input
                value={answers[6] || ''}
                onChange={(e) => handleInputChange(6, e.target.value)}
                className={`w-32 inline-block mx-1 ${showResults ? (answers[6]?.toLowerCase().trim() === notes[5].answer.toLowerCase() ? 'border-green-500' : 'border-red-500') : ''}`}
              /> than the U.S. though both have a large number of very rich people.</p>
              <p>Americans tend to save less, leading to less wealth accumulation.</p>
              <p>The U.S. example indicates that more <Input
                value={answers[7] || ''}
                onChange={(e) => handleInputChange(7, e.target.value)}
                className={`w-32 inline-block mx-1 ${showResults ? (answers[7]?.toLowerCase().trim() === notes[6].answer.toLowerCase() ? 'border-green-500' : 'border-red-500') : ''}`}
              /> can result in serious social imbalance.</p>
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
                Score: {score} / {notes.length}
              </div>
            )}
          </div>
          {showResults && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Results:</h3>
              <div className="space-y-2">
                {notes.map((note) => (
                  <div key={note.id} className="flex items-start space-x-2">
                    {answers[note.id]?.toLowerCase().trim() === note.answer.toLowerCase() ? (
                      <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="text-red-500 mt-1 flex-shrink-0" />
                    )}
                    <div>
                      <span className="font-semibold">{note.text}</span>
                      <span className={answers[note.id]?.toLowerCase().trim() === note.answer.toLowerCase() ? "text-green-600" : "text-red-600"}>
                        {" "}Your answer: {answers[note.id] || "(no answer)"}
                      </span>
                      {answers[note.id]?.toLowerCase().trim() !== note.answer.toLowerCase() && (
                        <span className="text-gray-600">
                          {" "}Correct answer: {note.answer}
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