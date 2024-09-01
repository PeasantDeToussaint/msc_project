import React, { useState } from 'react'
import { BookOpen, Shuffle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const questionTypes = [
  "Matching Features",
  "Table Completion",
  "Flow Chart Completion",
  "Identifying Information",
  "Matching Headings",
  "Matching Sentence Endings",
  "Multiple Choice",
  "Sentence Completion",
  "Summary Completion",
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
}

export default function Component() {
  const [selectedTypes, setSelectedTypes] = useState([])
  const [randomQuestionCount, setRandomQuestionCount] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  const handleStartPractice = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      const questionCount = selectedTypes.length > 0 ? 1 : 0
      window.location.href = `/ReadingPractice?selectedTypes=${encodeURIComponent(JSON.stringify(selectedTypes))}&questionCount=${questionCount}`
    }, 1000)
  }

  const handleRandomQuestions = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      const count = parseInt(randomQuestionCount)
      if (isNaN(count) || count < 1 || count > 10) return

      const shuffled = [...questionTypes].sort(() => 0.5 - Math.random())
      const selected = shuffled.slice(0, count)
      window.location.href = `/ReadingPractice?selectedTypes=${encodeURIComponent(JSON.stringify(selected))}&questionCount=${count}`
    }, 1000)
  }

  const handleRandomQuestionCountChange = (e) => {
    const value = e.target.value
    if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 10)) {
      setRandomQuestionCount(value)
    }
  }

  const isRandomQuestionCountValid = randomQuestionCount !== '' && parseInt(randomQuestionCount) >= 1 && parseInt(randomQuestionCount) <= 10

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <motion.div 
        className="w-full max-w-4xl space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center" variants={itemVariants}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <BookOpen className="mx-auto h-16 w-16 text-primary" />
          </motion.div>
          <h1 className="mt-6 text-4xl font-extrabold text-gray-900">Reading Practice</h1>
          <p className="mt-2 text-xl text-gray-600">
            Generate a random set of questions or customize your practice session.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Practice Options</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="random" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="random">Random Questions</TabsTrigger>
                  <TabsTrigger value="custom">Custom Selection</TabsTrigger>
                </TabsList>
                <TabsContent value="random">
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Generate a set of random questions for your practice. Enter a number between 1 and 10.
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
                        disabled={!isRandomQuestionCountValid || isLoading}
                        className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        <Shuffle className="mr-2 h-4 w-4" />
                        Generate Random Questions
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="custom">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </div>
                    <div className="flex justify-center mt-4">
                      <Button 
                        onClick={handleStartPractice} 
                        disabled={selectedTypes.length === 0 || isLoading}
                        className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        {isLoading ? 'Loading...' : 'Start Custom Practice'}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}