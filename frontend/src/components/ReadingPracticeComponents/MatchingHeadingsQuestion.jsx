'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"






import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from 'lucide-react'

const sections = [
  { id: 'A', content: "The role of governments in environmental management is difficult but inescapable. Sometimes, the state tries to manage the resources it owns, and does so badly. Often, however, governments act in an even more harmful way. They actually subsidise the exploitation and consumption of natural resources. A whole range of policies, from farm-price support to protection for coal-mining, do environmental damage and (often) make no economic sense. Scrapping them offers a two-fold bonus: a cleaner environment and a more efficient economy. Growth and environmentalism can actually go hand in hand, if politicians have the courage to confront the vested interest that subsidies create." },
  { id: 'B', content: "No activity affects more of the earth's surface than farming. It shapes a third of the planet's land area, not counting Antarctica, and the proportion is rising. World food output per head has risen by 4 per cent between the 1970s and 1980s mainly as a result of increases in yields from land already in cultivation, but also because more land has been brought under the plough. Higher yields have been achieved by increased irrigation, better crop breeding, and a doubling in the use of pesticides and chemical fertilisers in the 1970s and 1980s." },
  { id: 'C', content: "All these activities may have damaging environmental impacts. For example, land clearing for agriculture is the largest single cause of deforestation; chemical fertilisers and pesticides may contaminate water supplies; more intensive farming and the abandonment of fallow periods tend to exacerbate soil erosion; and the spread of monoculture and use of high-yielding varieties of crops have been accompanied by the disappearance of old varieties of food plants which might have provided some insurance against pests or diseases in future. Soil erosion threatens the productivity of land in both rich and poor countries. The United States, where the most careful measurements have been done, discovered in 1982 that about one-fifth of its farmland was losing topsoil at a rate likely to diminish the soil's productivity. The country subsequently embarked upon a program to convert 11 per cent of its cropped land to meadow or forest. Topsoil in India and China is vanishing much faster than in America." },
  { id: 'D', content: "Government policies have frequently compounded the environmental damage that farming can cause. In the rich countries, subsidies for growing crops and price supports for farm output drive up the price of land. The annual value of these subsidies is immense: about $250 billion, or more than all World Bank lending in the 1980s. To increase the output of crops per acre, a farmer's easiest option is to use more of the most readily available inputs: fertilisers and pesticides. Fertiliser use doubled in Denmark in the period 1960-1985 and increased in The Netherlands by 150 per cent. The quantity of pesticides applied has risen too: by 69 per cent in 1975-1984 in Denmark, for example, with a rise of 115 per cent in the frequency of application in the three years from 1981." },
  { id: 'E', content: "In poor countries, governments aggravate other sorts of damage. Subsidies for pesticides and artificial fertilisers encourage farmers to use greater quantities than are needed to get the highest economic crop yield. A study by the International Rice Research Institute of pesticide use by farmers in South East Asia found that, with pest-resistant varieties of rice, even moderate applications of pesticide frequently cost farmers more than they saved. Such waste puts farmers on a chemical treadmill: bugs and weeds become resistant to poisons, so next year's poisons must be more lethal. One cost is to human health. Every year some 10,000 people die from pesticide poisoning, almost all of them in the developing countries, and another 400,000 become seriously ill. As for artificial fertilisers, their use world-wide increased by 40 per cent per unit of farmed land between the mid 1970s and late 1980s, mostly in the developing countries. Overuse of fertilisers may cause farmers to stop rotating crops or leaving their land fallow. That, in turn, may make soil erosion worse." },
  { id: 'F', content: "A result of the Uruguay Round of world trade negotiations is likely to be a reduction of 36 per cent in the average levels of farm subsidies paid by the rich countries in 1986-1990. Some of the world's food production will move from Western Europe to regions where subsidies are lower or non-existent, such as the former communist countries and parts of the developing world. Some environmentalists worry about this outcome. It will undoubtedly mean more pressure to convert natural habitat into farmland. But it will also have many desirable environmental effects. The intensity of farming in the rich world should decline, and the use of chemical inputs will diminish. Crops are more likely to be grown in the environments to which they are naturally suited. And more farmers in poor countries will have the money and the incentive to manage their land in ways that are sustainable in the long run. That is important. To feed an increasingly hungry world, farmers need every incentive to use their soil and water effectively and efficiently" },
]

const headings = [
  { id: 'i', text: "The probable effects of the new international trade agreement" },
  { id: 'ii', text: "The environmental impact of modern farming" },
  { id: 'iii', text: "Farming and soil erosion" },
  { id: 'iv', text: "The effects of government policy in rich countries" },
  { id: 'v', text: "Governments and management of the environment" },
  { id: 'vi', text: "The effects of government policy in poor countries" },
  { id: 'vii', text: "Farming and food output" },
  { id: 'viii', text: "The effects of government policy on food output" },
  { id: 'ix', text: "The new prospects for world trade" },
]

const questions = [
  { id: 1, sectionId: 'A', correctAnswer: 'v' },
  { id: 2, sectionId: 'B', correctAnswer: 'vii' },
  { id: 3, sectionId: 'C', correctAnswer: 'ii' },
  { id: 4, sectionId: 'D', correctAnswer: 'iv' },
  { id: 5, sectionId: 'F', correctAnswer: 'i' },
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
            {sections.map((section) => (
              <div key={section.id} className="mb-4">
                <h3 className="font-bold mb-2">Section {section.id}</h3>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="space-y-4">
          <div className="bg-gray-100 border-l-4 border-gray-300 p-4 rounded-r-lg">
            <p className="text-sm text-gray-700">
              Choose the correct heading for sections A-D and F from the list of headings below.
              Write the correct number i-ix for each question.
            </p>
          </div>
          <div className="space-y-4">
            {questions.map((question) => (
              <div key={question.id} className="flex items-center space-x-2">
                <span className="font-medium w-24">Section {question.sectionId}</span>
                <Select onValueChange={(value) => handleSelect(question.id, value)} value={answers[question.id] || ""}>
                  <SelectTrigger className={`w-[500px] ${
                    showResults 
                      ? answers[question.id] === question.correctAnswer
                        ? 'border-green-500'
                        : 'border-red-500'
                      : ''
                  }`}>
                    <SelectValue placeholder="Select a heading" />
                  </SelectTrigger>
                  <SelectContent>
                    {headings.map((heading) => (
                      <SelectItem key={heading.id} value={heading.id}>
                        {heading.id}. {heading.text}
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
              <div className="grid grid-cols-1 gap-4">
                {questions.map((question) => (
                  <div key={question.id} className="flex items-center space-x-2">
                    {answers[question.id] === question.correctAnswer ? (
                      <CheckCircle className="text-green-500" />
                    ) : (
                      <XCircle className="text-red-500" />
                    )}
                    <span className="font-semibold">Section {question.sectionId}:</span>
                    <span className={answers[question.id] === question.correctAnswer ? "text-green-600" : "text-red-600"}>
                      Your answer: {answers[question.id] ? `${answers[question.id]}. ${headings.find(h => h.id === answers[question.id])?.text}` : "(no answer)"}
                    </span>
                    {answers[question.id] !== question.correctAnswer && (
                      <span className="text-gray-600">
                        Correct: {question.correctAnswer}. {headings.find(h => h.id === question.correctAnswer)?.text}
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