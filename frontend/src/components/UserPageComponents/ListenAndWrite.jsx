import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Volume2, Info, Clock, Settings, CheckCircle, XCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const BASE_URL = import.meta.env.VITE_BASE_URL || `http://localhost:${import.meta.env.ALLOCATED_PORT}`

const fetchVocabularyList = async (listId) => {
  try {
    const response = await fetch(`${BASE_URL}/wordList/wordList/${listId}`)
    if (!response.ok) {
      throw new Error('Failed to fetch vocabulary list')
    }
    const data = await response.json()
    return data.map((item, index) => ({
      id: index + 1,
      vocabulary: item.vocabulary,
      definition: item.definition,
      isReal: true
    }))
  } catch (error) {
    console.error('Error fetching vocabulary list:', error)
    return []
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

export default function VocabularyQuiz() {
  const [selectedListId, setSelectedListId] = useState(null)
  const [currentWords, setCurrentWords] = useState([])
  const [inputs, setInputs] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(null)
  const [timer, setTimer] = useState(300)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [numberOfWords, setNumberOfWords] = useState(10)
  const [quizDuration, setQuizDuration] = useState(5)
  const [showSettings, setShowSettings] = useState(false)
  const [tempNumberOfWords, setTempNumberOfWords] = useState(10)
  const [tempQuizDuration, setTempQuizDuration] = useState(5)
  const [availableLists, setAvailableLists] = useState([])
  const inputRefs = useRef([])

  useEffect(() => {
    const mockLists = Array.from({ length: 40 }, (_, index) => ({
      id: index + 1,
      name: `List ${index + 1}`
    }))
    setAvailableLists(mockLists)
  }, [])

  useEffect(() => {
    let interval = null
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    } else if (timer === 0) {
      handleSubmit()
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerRunning, timer])

  const selectRandomWords = (wordList) => {
    const shuffled = [...wordList].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, numberOfWords)
    setCurrentWords(selected)
    setInputs(new Array(selected.length).fill(''))
    setIsSubmitted(false)
    setScore(null)
  }

  const handleStartQuiz = async () => {
    if (selectedListId) {
      const wordList = await fetchVocabularyList(selectedListId)
      selectRandomWords(wordList)
      setTimer(quizDuration * 60)
      setIsTimerRunning(true)
      setQuizStarted(true)
    }
  }

  const handleInputChange = (index, value) => {
    setInputs(prev => {
      const newInputs = [...prev]
      newInputs[index] = value
      return newInputs
    })
  }

  const handleKeyPress = (event, index) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const nextInput = inputRefs.current[index + 1]
      if (nextInput) {
        nextInput.focus()
      } else {
        handleSubmit()
      }
    }
  }

  const handleSubmit = () => {
    setIsTimerRunning(false)
    const totalQuestions = currentWords.length
    const correctAnswers = currentWords.filter((word, index) =>
      inputs[index]?.toLowerCase().trim() === word.vocabulary.toLowerCase()
    ).length
    const calculatedScore = (correctAnswers / totalQuestions) * 100
    setScore(calculatedScore)
    setIsSubmitted(true)
  }

  const handleNextSection = async () => {
    if (selectedListId) {
      const wordList = await fetchVocabularyList(selectedListId)
      selectRandomWords(wordList)
      setTimer(quizDuration * 60)
      setIsTimerRunning(true)
      inputRefs.current = []
      setIsSubmitted(false)
    }
  }

  const handleListChange = async (value) => {
    setSelectedListId(value)
    if (quizStarted) {
      setQuizStarted(false)
      setIsTimerRunning(false)
      setTimer(quizDuration * 60)
      setCurrentWords([])
      setInputs([])
      setIsSubmitted(false)
      setScore(null)
    }
  }

  const handleApplySettings = () => {
    setNumberOfWords(tempNumberOfWords)
    setQuizDuration(tempQuizDuration)
    setShowSettings(false)
    setTimer(tempQuizDuration * 60)
    if (quizStarted && selectedListId) {
      handleStartQuiz()
    }
  }

  const speakWord = (word) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word)
      utterance.lang = 'en-US'
      speechSynthesis.speak(utterance)
    } else {
      console.error('Text-to-speech not supported in this browser')
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl mx-auto shadow-xl">
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Choose a word list!</h1>
          <div className="mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <Select onValueChange={handleListChange} value={selectedListId || undefined}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a word list" />
                </SelectTrigger>
                <SelectContent>
                  {availableLists.map((list) => (
                    <SelectItem key={list.id} value={list.id.toString()}>
                      {list.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Dialog open={showSettings} onOpenChange={setShowSettings}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" className="ml-2">
                    <Settings className="h-4 w-4" />
                    <span className="sr-only">Open settings</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Quiz Settings</DialogTitle>
                  </DialogHeader>
                  <div className="py-4 space-y-4">
                    <div>
                      <label htmlFor="numberOfWords" className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Words: {tempNumberOfWords}
                      </label>
                      <Slider
                        id="numberOfWords"
                        min={5}
                        max={40}
                        step={1}
                        value={[tempNumberOfWords]}
                        onValueChange={(value) => setTempNumberOfWords(value[0])}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="quizDuration" className="block text-sm font-medium text-gray-700 mb-1">
                        Quiz Duration (minutes): {tempQuizDuration}
                      </label>
                      <Slider
                        id="quizDuration"
                        min={1}
                        max={20}
                        step={1}
                        value={[tempQuizDuration]}
                        onValueChange={(value) => setTempQuizDuration(value[0])}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleApplySettings}>Apply Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          {selectedListId && !quizStarted && (
            <div className="text-center">
              <Button onClick={handleStartQuiz} className="w-full py-6 text-xl font-semibold">
                Start Quiz
              </Button>
            </div>
          )}
          <AnimatePresence mode="wait">
            {quizStarted && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <Progress value={(timer / (quizDuration * 60)) * 100} className="w-full mr-4" />
                  <div className="flex items-center text-lg font-semibold whitespace-nowrap">
                    <Clock className="mr-2" />
                    <span aria-live="polite">{formatTime(timer)}</span>
                  </div>
                </div>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {currentWords.map((word, index) => (
                    <motion.div key={index} variants={itemVariants} className="flex items-center space-x-4">
                      <span className="font-semibold w-6">{index + 1}.</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => speakWord(word.vocabulary)}
                        aria-label={`Listen to word ${index + 1}`}
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                      <div className="flex-grow">
                        <Input
                          type="text"
                          value={inputs[index] || ''}
                          onChange={(e) => handleInputChange(index, e.target.value)}
                          onKeyPress={(e) => handleKeyPress(e, index)}
                          placeholder="Type the word you hear"
                          className={`w-full ${
                            isSubmitted
                              ? inputs[index]?.toLowerCase().trim() === word.vocabulary.toLowerCase()
                                ? 'text-green-600'
                                : 'text-red-600'
                              : ''
                          }`}
                          disabled={isSubmitted}
                          ref={el => inputRefs.current[index] = el}
                        />
                        {isSubmitted && (
                          <div className="mt-1 text-sm">
                            {inputs[index]?.toLowerCase().trim() === word.vocabulary.toLowerCase() ? (
                              <span className="text-green-600 flex items-center">
                                <CheckCircle className="w-4 h-4 mr-1" /> Correct
                              </span>
                            ) : (
                              <span className="text-red-600 flex items-center">
                                <XCircle className="w-4 h-4 mr-1" /> 
                                {inputs[index] ? `Your answer: ${inputs[index]}` : 'No answer given'} | Correct: {word.vocabulary}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      {isSubmitted && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label={`View definition of word ${index + 1}`}>
                              <Info className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>{word.vocabulary}</DialogTitle>
                            </DialogHeader>
                            <p>{word.definition}</p>
                          </DialogContent>
                        </Dialog>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        {quizStarted && (
          <CardFooter className="flex justify-between items-center border-t p-6">
            {!isSubmitted ? (
              <Button onClick={handleSubmit} className="w-full py-6 text-xl font-semibold">
                Submit Answers
              </Button>
            ) : (
              <>
                <div className="text-xl font-bold">
                  Your Score: {score !== null ? `${score.toFixed(2)}%` : 'N/A'}
                </div>
                <Button onClick={handleNextSection} className="ml-4">
                  Next Section
                </Button>
              </>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  )
}