import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { CheckCircle, XCircle, ArrowLeft, BookOpen } from 'lucide-react'
import confetti from 'canvas-confetti'

const BASE_URL = import.meta.env.VITE_BASE_URL || `http://localhost:${import.meta.env.ALLOCATED_PORT}`;

const fetchVocabularyList = async (listId) => {
  try {
    const response = await fetch(`${BASE_URL}/wordList/wordList/${listId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch vocabulary list');
    }
    const data = await response.json();
    return data.map((item, index) => ({
      id: index + 1,
      vocabulary: item.vocabulary,
      definition: item.definition,
      isReal: true
    }));
  } catch (error) {
    console.error('Error fetching vocabulary list:', error);
    return [];
  }
};

export default function Component() {
  const [selectedList, setSelectedList] = useState('')
  const [currentWords, setCurrentWords] = useState([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [options, setOptions] = useState([])
  const [score, setScore] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [questionCount, setQuestionCount] = useState(5)
  const [incorrectAnswers, setIncorrectAnswers] = useState([])
  const [isAnswered, setIsAnswered] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackData, setFeedbackData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (selectedList && quizStarted) {
      setIsLoading(true)
      fetchVocabularyList(selectedList)
        .then(words => {
          const shuffledWords = shuffleArray(words).slice(0, questionCount)
          setCurrentWords(shuffledWords)
          setCurrentWordIndex(0)
          setScore(0)
          setQuizCompleted(false)
          setIncorrectAnswers([])
          setIsAnswered(false)
          if (shuffledWords.length > 0) {
            setOptions(generateOptions(shuffledWords, 0))
          }
        })
        .catch(error => {
          console.error('Error starting quiz:', error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [selectedList, quizStarted, questionCount])

  const shuffleArray = (array) => {
    let shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const generateOptions = (words, currentIndex) => {
    const correctDefinition = words[currentIndex].definition
    const otherDefinitions = words.filter((_, index) => index !== currentIndex).map(word => word.definition)
    const allOptions = [correctDefinition, ...otherDefinitions.slice(0, 3)]
    return shuffleArray(allOptions)
  }

  const handleOptionSelect = (selectedOption) => {
    if (isAnswered) return

    const currentWord = currentWords[currentWordIndex]
    const isCorrect = selectedOption === currentWord.definition
    setIsAnswered(true)
    setFeedbackData({
      isCorrect,
      word: currentWord.vocabulary,
      correctAnswer: currentWord.definition,
      selectedAnswer: selectedOption
    })
    setShowFeedback(true)

    if (isCorrect) {
      setScore(score + 1)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    } else {
      setIncorrectAnswers([...incorrectAnswers, currentWord])
    }
  }

  const moveToNextQuestion = () => {
    setShowFeedback(false)
    setIsAnswered(false)
    if (currentWordIndex + 1 < currentWords.length) {
      const nextIndex = currentWordIndex + 1
      setCurrentWordIndex(nextIndex)
      setOptions(generateOptions(currentWords, nextIndex))
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setSelectedList('')
    setCurrentWords([])
    setCurrentWordIndex(0)
    setScore(0)
    setQuizStarted(false)
    setQuizCompleted(false)
    setOptions([])
    setIncorrectAnswers([])
    setIsAnswered(false)
    setShowFeedback(false)
    setFeedbackData(null)
  }

  const startQuiz = () => {
    if (selectedList) {
      setQuizStarted(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl mx-auto shadow-xl">
        <CardContent className="p-8">
          <AnimatePresence mode="wait">
            {!quizStarted && (
              <motion.div
                key="selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <h2 className="text-4xl font-extrabold text-center mb-8">Choose a word list!</h2>
                <div className="space-y-4">
                  <Select value={selectedList} onValueChange={setSelectedList}>
                    <SelectTrigger id="wordList" className="w-full">
                      <SelectValue placeholder="Select a word list" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 40 }, (_, i) => i + 1).map((listId) => (
                        <SelectItem key={listId} value={listId.toString()}>List {listId}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <label htmlFor="questionCount" className="block text-sm font-medium text-gray-700">
                    Number of questions: {questionCount}
                  </label>
                  <Slider
                    id="questionCount"
                    min={1}
                    max={20}
                    step={1}
                    value={[questionCount]}
                    onValueChange={(value) => setQuestionCount(value[0])}
                    className="w-full"
                  />
                </div>
                <Button onClick={startQuiz} disabled={!selectedList} className="w-full py-6 text-xl font-semibold">
                  Start Quiz
                </Button>
              </motion.div>
            )}

            {quizStarted && !quizCompleted && currentWords.length > 0 && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center">
                  <Button onClick={resetQuiz} variant="outline" size="icon">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-xl font-bold">
                    Question {currentWordIndex + 1} of {currentWords.length}
                  </div>
                </div>
                <Progress value={((currentWordIndex + 1) / currentWords.length) * 100} className="w-full" />
                <div className="text-center space-y-4">
                  <p className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900">
                    {currentWords[currentWordIndex].vocabulary}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleOptionSelect(option)}
                      className={`p-6 text-left bg-white hover:bg-gray-50 rounded-lg shadow-md transition-all ${
                        isAnswered ? 'cursor-not-allowed opacity-50' : 'hover:shadow-lg'
                      }`}
                      whileHover={isAnswered ? {} : { scale: 1.02 }}
                      whileTap={isAnswered ? {} : { scale: 0.98 }}
                      disabled={isAnswered}
                    >
                      <p className="text-xl font-serif">{option}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {quizCompleted && (
              <motion.div
                key="completed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <p className="text-3xl mb-2">Your score:</p>
                  <p className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900">
                    {score} / {currentWords.length}
                  </p>
                </div>
                
                {incorrectAnswers.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold flex items-center">
                      <BookOpen className="mr-2" /> Words to review:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {incorrectAnswers.map((word, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                          <p className="text-xl font-bold mb-2">{word.vocabulary}</p>
                          <p className="text-gray-600">{word.definition}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <motion.button
                  onClick={resetQuiz}
                  className="w-full px-8 py-4 text-xl font-semibold bg-gray-900 text-white rounded-lg shadow-lg hover:bg-gray-800 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try Again
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <Dialog open={showFeedback} onOpenChange={setShowFeedback}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {feedbackData?.isCorrect ? (
                    <span className="text-green-500 flex items-center">
                      <CheckCircle className="inline-block mr-2" /> Correct!
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center">
                      <XCircle className="inline-block mr-2" /> Oops! You got it wrong 😕
                    </span>
                  )}
                </DialogTitle>
              </DialogHeader>
              <DialogDescription className="text-lg space-y-2">
                {feedbackData?.isCorrect ? (
                  <p>Great job! You've correctly defined the word.</p>
                ) : (
                  <>
                    <p className="font-semibold">Correct definition:</p>
                    <p className="italic">{feedbackData?.correctAnswer}</p>
                  </>
                )}
              </DialogDescription>
              <DialogFooter>
                <Button onClick={moveToNextQuestion} className="w-full sm:w-auto">
                  {currentWordIndex + 1 < currentWords.length ? 'Next Question' : 'Finish Quiz'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  )
}