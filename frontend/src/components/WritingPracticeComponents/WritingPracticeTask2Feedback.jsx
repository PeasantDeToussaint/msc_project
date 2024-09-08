'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, ChevronDown, Loader2, RefreshCw } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"

const BASE_URL = import.meta.env.VITE_BASE_URL || `http://localhost:${import.meta.env.VITE_ALLOCATED_PORT}`;

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
  const initialPrompt = location.state?.prompt || ''
  const initialResponse = location.state?.response || ''

  const [essayData, setEssayData] = useState({
    prompt: initialPrompt,
    response: initialResponse
  })

  const [feedback, setFeedback] = useState({
    overallScore: 'N/A',
    sections: [
      { title: 'Task Response', score: 'N/A', text: 'No feedback available', elaboration: '' },
      { title: 'Coherence and Cohesion', score: 'N/A', text: 'No feedback available', elaboration: '' },
      { title: 'Lexical Resource', score: 'N/A', text: 'No feedback available', elaboration: '' },
      { title: 'Grammatical Range and Accuracy', score: 'N/A', text: 'No feedback available', elaboration: '' },
    ],
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [elaboratingSections, setElaboratingSections] = useState({})
  const hasFetchedFeedback = useRef(false)

  useEffect(() => {
    const cachedData = localStorage.getItem('essayData')
    if (cachedData) {
      const parsedData = JSON.parse(cachedData)
      setEssayData(parsedData)
    }

    if (essayData.prompt && essayData.response && !hasFetchedFeedback.current) {
      const cachedFeedback = localStorage.getItem(`feedback_${essayData.prompt}_${essayData.response}`)
      if (cachedFeedback) {
        setFeedback(JSON.parse(cachedFeedback))
        setLoading(false)
        hasFetchedFeedback.current = true
      } else {
        fetchFeedback()
      }
    }
  }, [essayData.prompt, essayData.response])

  const fetchFeedback = async () => {
    setLoading(true)
    hasFetchedFeedback.current = true

    const token = localStorage.getItem('token')

    try {
      const res = await fetch(`${BASE_URL}/essay/processEssay`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(essayData),
      })

      if (!res.ok) {
        throw new Error('Failed to fetch feedback')
      }

      const data = await res.json()
      const parsedFeedback = parseFeedback(data)
      setFeedback(parsedFeedback)
      localStorage.setItem(`feedback_${essayData.prompt}_${essayData.response}`, JSON.stringify(parsedFeedback))
      localStorage.setItem('essayData', JSON.stringify(essayData))
      setLoading(false)
    } catch (err) {
      console.error('Error fetching feedback:', err)
      setError('Failed to fetch feedback. Please try again later.')
      setLoading(false)
      toast({
        title: "Error",
        description: "Failed to fetch feedback. Please try again.",
        variant: "destructive",
      })
    }
  }

  const parseFeedback = (data) => {
    return {
      overallScore: data.overallScore || 'N/A',
      sections: [
        {
          title: 'Task Response',
          score: data.taskResponse?.score || 'N/A',
          text: data.taskResponse?.text || 'No feedback available',
          elaboration: '',
        },
        {
          title: 'Coherence and Cohesion',
          score: data.coherence?.score || 'N/A',
          text: data.coherence?.text || 'No feedback available',
          elaboration: '',
        },
        {
          title: 'Lexical Resource',
          score: data.lexical?.score || 'N/A',
          text: data.lexical?.text || 'No feedback available',
          elaboration: '',
        },
        {
          title: 'Grammatical Range and Accuracy',
          score: data.grammar?.score || 'N/A',
          text: data.grammar?.text || 'No feedback available',
          elaboration: '',
        },
      ],
    }
  }

  const fetchElaboration = async (sectionTitle) => {
    setElaboratingSections(prev => ({ ...prev, [sectionTitle]: true }))
    const token = localStorage.getItem('token')

    const cachedElaboration = localStorage.getItem(`elaboration_${essayData.prompt}_${essayData.response}_${sectionTitle}`)
    if (cachedElaboration) {
      setFeedback(prevFeedback => ({
        ...prevFeedback,
        sections: prevFeedback.sections.map(s => 
          s.title === sectionTitle 
            ? { ...s, elaboration: cachedElaboration }
            : s
        )
      }))
      setElaboratingSections(prev => ({ ...prev, [sectionTitle]: false }))
      return
    }

    try {
      const response = await fetch(`${BASE_URL}/essay/elaborateFeedback`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ...essayData,
          section: sectionTitle,
          currentFeedback: feedback.sections.find(s => s.title === sectionTitle)?.text || ''
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch elaboration')
      }

      const data = await response.json()
      
      setFeedback(prevFeedback => ({
        ...prevFeedback,
        sections: prevFeedback.sections.map(s => 
          s.title === sectionTitle 
            ? { ...s, elaboration: data.elaboration }
            : s
        )
      }))

      localStorage.setItem(`elaboration_${essayData.prompt}_${essayData.response}_${sectionTitle}`, data.elaboration)
    } catch (err) {
      console.error('Error fetching elaboration:', err)
      toast({
        title: "Error",
        description: "Failed to fetch elaboration. Please try again.",
        variant: "destructive",
      })
    } finally {
      setElaboratingSections(prev => ({ ...prev, [sectionTitle]: false }))
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-blue-600 mb-4" />
        <p className="text-lg text-blue-600">Analyzing your essay...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-4xl py-12 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={fetchFeedback} className="bg-blue-600 hover:bg-blue-700 text-white">
          <RefreshCw className="w-5 h-5 mr-2" />
          Try Again
        </Button>
      </div>
    )
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
                <Progress value={parseFloat(feedback.overallScore) * 10} className="mt-2" />
              </CardContent>
            </Card>

            <div className="space-y-6">
              {feedback.sections.map((section, index) => (
                <Sheet key={index}>
                  <SheetTrigger asChild>
                    <Card 
                      className="w-full transition-all duration-300 hover:shadow-md cursor-pointer"
                    >
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg font-bold text-stone-800">{section.title}</CardTitle>
                          <div className="flex items-center">
                            <div className="text-2xl font-bold text-blue-600 mr-4">{section.score}</div>
                            <ChevronDown className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-stone-600">{section.text}</p>
                      </CardContent>
                    </Card>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>{section.title}</SheetTitle>
                    </SheetHeader>
                    <ScrollArea className="h-[calc(100vh-10rem)] mt-6 pr-4">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-semibold mb-2">Score: {section.score}</h4>
                          <Progress value={parseFloat(section.score) * 10} className="mt-2" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-2">Your Feedback:</h4>
                          <p className="text-stone-700">{section.text}</p>
                        </div>
                        <div>
        
                          {section.elaboration ? (
                            <p className="text-stone-700 whitespace-pre-wrap">{section.elaboration}</p>
                          ) : (
                            <div className="space-y-4">
                              <Button 
                                onClick={() => fetchElaboration(section.title)}
                                disabled={elaboratingSections[section.title]}
                                className="w-full"
                              >
                                {elaboratingSections[section.title] ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Fetching Elaboration...
                                  </>
                                ) : (
                                  'Tell me more'
                                )}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </ScrollArea>
                  </SheetContent>
                </Sheet>
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