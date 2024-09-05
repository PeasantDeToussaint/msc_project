'use client'

import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { motion } from 'framer-motion'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, ArrowLeft, Send } from 'lucide-react'

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

export default function WritingPracticeTask1() {
  const location = useLocation()
  const navigate = useNavigate()
  const prompt = location.state?.prompt

  if (!prompt) {
    navigate("/IELTSTask1Practice")
    return null
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const [timeRemaining, setTimeRemaining] = useState(1200) // 20 minutes in seconds
  const [response, setResponse] = useState("")
  const [wordCount, setWordCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleWordCount = (event) => {
    const text = event.target.value
    setResponse(text)
    setWordCount(text.split(/\s+/).filter((word) => word.length > 0).length)
  }

  const handleSubmit = () => {
    navigate("/WritingPracticeTask1Feedback", {
      state: {
        prompt: prompt.question,
        response: response,
        image_url: prompt.image_url,
      },
    })
  }

  const handleBackToIntro = () => {
    navigate("/WritingPracticeTask1Intro")
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
            <CardTitle className="text-2xl font-bold text-stone-800 flex items-center justify-between">
              IELTS Task 1 Practice
              <div className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full">
                <Clock className="w-5 h-5" />
                <span className="font-bold">{formatTime(timeRemaining)}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {prompt.image_url ? (
              <img
                src={`${BASE_URL}/uploads/${prompt.image_url}`}
                alt="Prompt"
                className="w-full h-auto object-contain rounded-lg"
                style={{ aspectRatio: "800/450" }}
              />
            ) : (
              <p className="text-stone-600">No images available for this prompt.</p>
            )}
            <Card className="bg-stone-50">
              <CardContent className="p-4">
                <h2 className="text-lg font-bold text-stone-800 mb-2">Your task:</h2>
                <p className="text-stone-600">{prompt.question}</p>
              </CardContent>
            </Card>
            <div>
              <label htmlFor="response" className="block text-sm font-medium text-stone-700 mb-2">
                Your Response:
              </label>
              <Textarea
                id="response"
                name="response"
                rows={12}
                placeholder="Type your response here..."
                className="w-full bg-white border-stone-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                onChange={handleWordCount}
              />
              <div className="mt-2 text-sm text-stone-500">
                Word Count: <span id="word-count">{wordCount}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Button onClick={handleBackToIntro} variant="outline" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleSubmit} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white">
                Submit
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}