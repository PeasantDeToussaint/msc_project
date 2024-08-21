import { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

export default function ReadingPracticeComponent() {
  const questionTypes = [
    "Matching Features",
    "Table Completion",
    "Flow-chart completion",
    "Identifying information",
    "Matching headings",
    "Matching sentence endings",
    "Multiple choice (more than one answer)",
    "Multiple choice (one answer)",
    "Note completion",
    "Sentence completion",
    "Summary completion",
  ]

  const [selectedTypes, setSelectedTypes] = useState([])
  const [randomQuestionCount, setRandomQuestionCount] = useState('')

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  const handleStartPractice = () => {
    console.log("Starting practice with types:", selectedTypes)
    // Here you would typically navigate to the practice page or start the practice
  }

  const handleRandomQuestions = () => {
    const count = parseInt(randomQuestionCount)
    if (isNaN(count) || count < 1 || count > 10) return

    const shuffled = [...questionTypes].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, count)
    setSelectedTypes(selected)
  }

  const handleRandomQuestionCountChange = (e) => {
    const value = e.target.value
    if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 10)) {
      setRandomQuestionCount(value)
    }
  }

  const isRandomQuestionCountValid = randomQuestionCount !== '' && parseInt(randomQuestionCount) >= 1 && parseInt(randomQuestionCount) <= 10

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-6">IELTS Reading Practice</h1>
      
      <Card className="bg-muted">
        <CardContent className="pt-6">
          <p className="text-muted-foreground">
            Welcome to the IELTS Reading Practice page! Customize your practice session by selecting specific question types or generate a random set. Choose as many or as few as you like. Once you've made your selections, click "Start Practice" to begin. Good luck with your IELTS preparation!
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Select question types</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {questionTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox 
                id={type} 
                checked={selectedTypes.includes(type)}
                onCheckedChange={() => handleTypeToggle(type)}
              />
              <Label htmlFor={type} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {type}
              </Label>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            onClick={handleStartPractice} 
            disabled={selectedTypes.length === 0}
            className="px-6 py-2"
          >
            Start Practice
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Random Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Generate a set of random questions for your practice. Enter a number between 1 and 10 to specify how many questions you'd like to practice. The questions will be randomly selected from all available types.
          </p>
          <div className="flex items-center space-x-4">
            <Label htmlFor="randomCount" className="whitespace-nowrap">Number of questions:</Label>
            <Input
              id="randomCount"
              type="number"
              min="1"
              max="10"
              value={randomQuestionCount}
              onChange={handleRandomQuestionCountChange}
              className="w-20"
            />
            <Button 
              onClick={handleRandomQuestions}
              disabled={!isRandomQuestionCountValid}
            >
              Generate Random Questions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
