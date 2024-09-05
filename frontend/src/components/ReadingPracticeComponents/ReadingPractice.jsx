import { useState, useEffect } from 'react'
import { useSpring, animated, config } from 'react-spring'
import { Button } from "@/components/ui/button"
import MultipleChoiceQuestion from './MultipleChoiceQuestion'
import FlowChartCompletionQuestion from './FlowChartCompletionQuestion'
import MatchingFeaturesQuestion from './MatchingFeaturesQuestion'
import MatchingHeadingsQuestion from './MatchingHeadingsQuestion'
import MatchingSentenceEndingsQuestion from './MatchingSentenceEndingsQuestion'
import SentenceCompletionQuestion from './SentenceCompletionQuestion'
import SummaryCompletionQuestion from './SummaryCompletionQuestion'
import TableCompletionQuestion from './TableCompletionQuestion'
const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.ALLOCATED_PORT}`;


const questionComponents = {
  'Multiple Choice': MultipleChoiceQuestion,
  'Flow Chart Completion': FlowChartCompletionQuestion,
  'Matching Features': MatchingFeaturesQuestion,
  'Matching Headings': MatchingHeadingsQuestion,
  'Matching Sentence Endings': MatchingSentenceEndingsQuestion,
  'Sentence Completion': SentenceCompletionQuestion,
  'Summary Completion': SummaryCompletionQuestion,
  'Table Completion': TableCompletionQuestion,
}

export default function ReadingPracticePage() {
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const selectedTypes = JSON.parse(decodeURIComponent(searchParams.get('selectedTypes') || '[]'))
    const questionCount = parseInt(searchParams.get('questionCount') || '0')

    if (selectedTypes.length > 0 && questionCount > 0) {
      const fetchQuestions = async () => {
        try {
          const responses = await Promise.all(
            selectedTypes.map(type =>
              fetch(`${BASE_URL}/readingQuestions/questions?type=${encodeURIComponent(type)}&count=${questionCount}`)
                .then(response => {
                  if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                  }
                  return response.json()
                })
            )
          )
          const fetchedQuestions = responses.flat()
          setQuestions(fetchedQuestions)
        } catch (error) {
          console.error('Error fetching questions:', error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchQuestions()
    } else {
      setIsLoading(false)
    }
  }, [])

  const contentAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.gentle,
  })

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-xl">Loading...</p>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-xl">No questions selected. Please go back and select some questions.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <animated.div style={contentAnimation}>
          
          <div className="space-y-12">
            {questions.map((question, index) => {
              const QuestionComponent = questionComponents[question.type]
              if (!QuestionComponent) {
                console.error(`No component found for question type: ${question.type}`)
                return <p key={index}>No component found for question type: {question.type}</p>
              }
              return (
                <div key={index} className="space-y-4">
                  <h2 className="text-xl font-medium text-gray-900">Question {index + 1}</h2>
                  <QuestionComponent question={question} />
      </div>
              )
            })}
        </div>

          <div className="mt-12 flex justify-center">
            <Button
              onClick={() => window.location.href = '/ReadingPracticeIntro'}
              className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors"
            >
              Back to Selection
            </Button>
        </div>
        </animated.div>
      </div>
    </div>
  )
}