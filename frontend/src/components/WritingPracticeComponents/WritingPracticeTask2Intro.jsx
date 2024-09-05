'use client'

import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { motion } from 'framer-motion'
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, Shuffle } from 'lucide-react'
const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.ALLOCATED_PORT}`;


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

const IELTSWritingPractice = () => {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const navigate = useNavigate()

  const handleTopicChange = (value) => {
    setSelectedTopic(value)
  }

  const handleStartPractice = async () => {
    try {
      const response = await fetch(`${BASE_URL}/writingTask2Questions/selected-question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categories: [selectedTopic] }),
      })
      const data = await response.json()
      if (response.ok) {
        navigate(`/WritingPracticeTask2`, { state: { prompt: data } })
      } else {
        console.error('Error fetching prompt:', data.error)
      }
    } catch (error) {
      console.error('Error fetching prompt:', error)
    }
  }

  const handleRandomPractice = async () => {
    try {
      const response = await fetch(`${BASE_URL}/writingTask2Questions/random-question`)
      const data = await response.json()
      if (response.ok) {
        navigate(`/WritingPracticeTask2`, { state: { prompt: data } })
      } else {
        console.error('Error fetching prompt:', data.error)
      }
    } catch (error) {
      console.error('Error fetching random prompt:', error)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      <AnimatedBackground />
      <motion.div 
        className="max-w-3xl mx-auto space-y-8 relative z-10"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Card className="bg-white shadow-lg overflow-hidden border-t-4 border-blue-500">
          <CardHeader className="bg-stone-50 border-b border-stone-200">
            <CardTitle className="text-3xl font-bold text-stone-800">Task 2 Writing Practice</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <p className="text-stone-600">
              In this practice session, you will be presented with a variety of IELTS Task 2 writing prompts. Select a
              topic category, then click "Start Practice" to begin writing your response.
            </p>
            <Separator className="my-8" />
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-stone-800">Select a Topic Category</h2>
              <RadioGroup value={selectedTopic} onValueChange={handleTopicChange}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    "Public Transport", "Employment", "Youth Crime", "Celebrity", "Society",
                    "Government Spending", "Development", "Globalisation", "Criminal Justice",
                    "Technology", "Environment", "Education", "Health",
                  ].map((topic) => (
                    <div key={topic} className="flex items-center space-x-2">
                      <RadioGroupItem id={topic} value={topic} />
                      <Label htmlFor={topic} className="text-stone-700">{topic}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
            <div className="flex justify-center mt-8 space-x-4">
              <Button
                onClick={handleStartPractice}
                className={`inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  selectedTopic ? "" : "pointer-events-none opacity-50"
                }`}
              >
                <BarChart2 className="w-5 h-5 mr-2" />
                Start Practice
              </Button>
              <Button 
                onClick={handleRandomPractice} 
                variant="outline"
                className="inline-flex items-center justify-center rounded-md border border-blue-600 px-6 py-3 text-sm font-medium text-blue-600 shadow transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <Shuffle className="w-5 h-5 mr-2" />
                Practice Random Question
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default IELTSWritingPractice