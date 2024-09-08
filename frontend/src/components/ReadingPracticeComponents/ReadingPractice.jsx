"use client"

import { useState, useEffect } from 'react'
import { useSpring, animated, config } from 'react-spring'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Clock, ArrowLeft, ArrowRight } from 'lucide-react'
import MultipleChoiceQuestion from './MultipleChoiceQuestion'
import MatchingFeaturesQuestion from './MatchingFeaturesQuestion'
import MatchingSentenceEndingsQuestion from './MatchingSentenceEndingsQuestion'
import SentenceCompletionQuestion from './SentenceCompletionQuestion'
import SummaryCompletionQuestion from './SummaryCompletionQuestion'
import TableCompletionQuestion from './TableCompletionQuestion'

const BASE_URL = import.meta.env.VITE_BASE_URL || `http://localhost:${import.meta.env.VITE_ALLOCATED_PORT}`;

const questionComponents = {
  'Multiple Choice': MultipleChoiceQuestion,
  'Matching Features': MatchingFeaturesQuestion,
  'Matching Sentence Endings': MatchingSentenceEndingsQuestion,
  'Sentence Completion': SentenceCompletionQuestion,
  'Summary Completion': SummaryCompletionQuestion,
  'Table Completion': TableCompletionQuestion,
}

const TIMER_DURATION = 10 * 60 // 10 minutes in seconds

export default function ReadingPracticePage() {
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedType, setSelectedType] = useState('')
  const [timeRemaining, setTimeRemaining] = useState(TIMER_DURATION)

  const fetchQuestion = async (type) => {
    try {
      const response = await fetch(`${BASE_URL}/readingQuestions/questions?type=${encodeURIComponent(type)}&count=1`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const fetchedQuestions = await response.json()
      return fetchedQuestions[0]
    } catch (error) {
      console.error('Error fetching question:', error)
      return null
    }
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const type = searchParams.get('selectedType')
    setSelectedType(type)

    if (type) {
      const fetchInitialQuestion = async () => {
        const question = await fetchQuestion(type)
        if (question) {
          setQuestions([question])
        }
        setIsLoading(false)
      }

      fetchInitialQuestion()
    } else {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentQuestionIndex])

  const handleNextQuestion = async () => {
    setIsLoading(true)
    const newQuestion = await fetchQuestion(selectedType)
    if (newQuestion) {
      setQuestions(prevQuestions => [...prevQuestions, newQuestion])
      setCurrentQuestionIndex(prevIndex => prevIndex + 1)
      setTimeRemaining(TIMER_DURATION)
    }
    setIsLoading(false)
  }

  const contentAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.gentle,
  })

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-xl">No questions found. Please go back and select a question type.</p>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-[url('/subtle-prism.svg')] bg-cover">
      <div className="max-w-4xl mx-auto">
        <animated.div style={contentAnimation}>
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Question {currentQuestionIndex + 1}</h2>
                <div className="flex items-center text-primary bg-primary/10 px-4 py-2 rounded-full">
                  <Clock className="mr-2 h-5 w-5" />
                  <span className="text-lg font-semibold">{formatTime(timeRemaining)}</span>
                </div>
              </div>
              {(() => {
                const QuestionComponent = questionComponents[currentQuestion.type]
                if (!QuestionComponent) {
                  console.error(`No component found for question type: ${currentQuestion.type}`)
                  return <p>No component found for question type: {currentQuestion.type}</p>
                }
                return <QuestionComponent question={currentQuestion} />
              })()}
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-between items-center">
            <Button
              onClick={() => window.location.href = '/ReadingPracticeIntro'}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Selection</span>
            </Button>
            <Button
              onClick={handleNextQuestion}
              className="flex items-center space-x-2"
            >
              <span>Next Question</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </animated.div>
      </div>
    </div>
  )
}