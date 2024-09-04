'use client'

import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Send, ArrowLeft } from 'lucide-react'

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

const WritingPracticeTask2 = () => {
  const [timer, setTimer] = useState(0)
  const [wordCount, setWordCount] = useState(0)
  const [response, setResponse] = useState('')
  const [prompt, setPrompt] = useState('')
  const [category, setCategory] = useState('')
  const [timeLimit, setTimeLimit] = useState(0)
  const [isTimeUp, setIsTimeUp] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const location = useLocation()
  const promptData = location.state?.prompt
  const { toast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (promptData) {
      setPrompt(promptData.question)
      setCategory(promptData.category)
      setTimeLimit(promptData.time_limit)
    }
  }, [promptData])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer + 1 >= timeLimit * 60) {
          clearInterval(interval)
          setIsTimeUp(true)
          toast({
            description: "Time's up!",
          })
        }
        return prevTimer + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timeLimit, toast])

  const handleResponseChange = (event) => {
    const text = event.target.value
    setResponse(text)
    setWordCount(text.split(/\s+/).filter(word => word.length > 0).length)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (isSubmitted) return
    setIsSubmitted(true)

    toast({ description: "Response submitted!" })

    navigate('/WritingPracticeTask2Feedback', {
      state: {
        prompt: prompt,
        response: response,
      },
    })
  }

  const handleReturn = () => {
    navigate(-1) // This will return to the previous page
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      <AnimatedBackground />
      <Toaster />
      <motion.div 
        className="max-w-4xl mx-auto space-y-8 relative z-10"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Card className="bg-white shadow-lg overflow-hidden border-t-4 border-blue-500">
          <CardHeader className="bg-stone-50 border-b border-stone-200">
            <CardTitle className="text-3xl font-bold text-stone-800">Task 2 Practice</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="flex justify-between items-center">
              <Button 
                type="button"
                onClick={handleReturn}
                variant="outline"
                className="bg-white hover:bg-stone-100 text-blue-600 border-blue-600 flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return
              </Button>
              <p className="text-sm text-stone-600">Write a 250-word response.</p>
            </div>
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <p className="text-sm text-blue-900 font-medium mb-2">
                  Topic: {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </p>
                <p className="text-sm text-blue-900 font-medium mb-2">
                  Question: {prompt || "Loading..."}
                </p>
                <p className="text-sm text-blue-900 font-medium">
                  Time Limit: {timeLimit} minutes
                </p>
              </CardContent>
            </Card>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <Textarea
                  value={response}
                  onChange={handleResponseChange}
                  placeholder="Start writing your response here..."
                  className="w-full h-[400px] text-sm p-4 rounded-md border border-stone-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  disabled={isTimeUp || isSubmitted}
                />
                <div className="absolute top-4 right-4 flex items-center gap-2 text-sm text-stone-500 bg-white px-2 py-1 rounded-md">
                  <Clock className="w-4 h-4" />
                  <span id="timer">{formatTime(timer)}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-stone-600">
                  <span id="word-count">{wordCount}</span> words
                </div>
                <Button 
                  type="submit" 
                  disabled={isTimeUp || isSubmitted}
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default WritingPracticeTask2