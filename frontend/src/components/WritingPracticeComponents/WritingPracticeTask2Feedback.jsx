'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAg')] bg-[size:20px_20px] opacity-5" />
    </div>
  )
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function Feedback() {
  const location = useLocation()
  const { prompt, response } = location.state || {}

  const [feedback, setFeedback] = useState({
    overallScore: 'N/A',
    sections: [
      { title: 'Task Response', score: 'N/A', text: 'No feedback available' },
      { title: 'Coherence and Cohesion', score: 'N/A', text: 'No feedback available' },
      { title: 'Lexical Resource', score: 'N/A', text: 'No feedback available' },
      { title: 'Grammatical Range and Accuracy', score: 'N/A', text: 'No feedback available' },
    ],
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const hasFetchedFeedback = useRef(false)

  useEffect(() => {
    if (prompt && response && !hasFetchedFeedback.current) {
      setLoading(true)
      hasFetchedFeedback.current = true

      const token = localStorage.getItem('token')
      console.log("token is like this:", token)

      fetch('http://localhost:3000/essay/processEssay', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, response }),
      })
        .then((res) => res.json())
        .then((data) => {
          const parsedFeedback = parseFeedback(data)
          setFeedback(parsedFeedback)
          setLoading(false)
        })
        .catch((err) => {
          console.error('Error fetching feedback:', err)
          setError('Failed to fetch feedback. Please try again later.')
          setLoading(false)
        })
    }
  }, [prompt, response])

  const parseFeedback = (data) => {
    return {
      overallScore: data.overallScore || 'N/A',
      sections: [
        {
          title: 'Task Response',
          score: data.taskResponse?.score || 'N/A',
          text: data.taskResponse?.text || 'No feedback available',
        },
        {
          title: 'Coherence and Cohesion',
          score: data.coherence?.score || 'N/A',
          text: data.coherence?.text || 'No feedback available',
        },
        {
          title: 'Lexical Resource',
          score: data.lexical?.score || 'N/A',
          text: data.lexical?.text || 'No feedback available',
        },
        {
          title: 'Grammatical Range and Accuracy',
          score: data.grammar?.score || 'N/A',
          text: data.grammar?.text || 'No feedback available',
        },
      ],
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return <div className="container mx-auto max-w-4xl py-12">{error}</div>
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      <AnimatedBackground />
      <motion.div 
        className="max-w-4xl mx-auto space-y-8 relative z-10"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Card className="bg-white shadow-lg overflow-hidden border-t-4 border-blue-500">
          <CardHeader className="bg-stone-50 border-b border-stone-200">
            <CardTitle className="text-3xl font-bold text-stone-800">Feedback on your essay</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <Card className="bg-blue-50">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-blue-900">Overall Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-600">{feedback.overallScore}</div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {feedback.sections.map((section, index) => (
                <Card key={index} className="w-full">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-stone-800">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-start">
                      <p className="text-stone-600 flex-grow pr-4">{section.text}</p>
                      <div className="text-2xl font-bold text-blue-600">{section.score}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Link to="/WritingPracticeTask2Intro">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Return to Practice
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}