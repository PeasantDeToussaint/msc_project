'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

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

const ProgressStep = ({ number, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">{number}</div>
    <div>
      <h3 className="font-semibold text-lg text-stone-800">{title}</h3>
      <p className="text-sm text-stone-600">{description}</p>
    </div>
  </div>
)

export default function TopicSelection() {
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleStartPractice = () => {
    navigate('/SpeakingPracticeRandom');
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      <AnimatedBackground />
      <Toaster />
      <motion.div 
        className="max-w-3xl mx-auto space-y-8 relative z-10"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Card className="bg-white shadow-lg overflow-hidden border-t-4 border-blue-500">
          <CardHeader className="bg-stone-50 border-b border-stone-200">
            <CardTitle className="text-3xl font-bold tracking-tight sm:text-4xl text-center text-stone-800">IELTS Speaking Practice</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-stone-800">Overview</h2>
              <p className="text-stone-600">
                The IELTS Speaking Practice simulates a 11-14 minute face-to-face interview with a certified examiner. It is divided into three parts:
              </p>
              <div className="space-y-6 mt-6">
                <ProgressStep 
                  number="1" 
                  title="Introduction and Interview (4-5 minutes)" 
                  description="Answer questions about yourself and your family"
                />
                <ProgressStep 
                  number="2" 
                  title="Individual Long Turn (3-4 minutes)" 
                  description="Speak about a given topic introduced by the examiner"
                />
                <ProgressStep 
                  number="3" 
                  title="Two-way Discussion (4-5 minutes)" 
                  description="Have a longer discussion with the examiner about the topic from Part 2"
                />
              </div>
            </div>
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-4">
                <p className="text-gray-800 font-medium flex items-center">
                  <CheckCircle2 className="mr-2 text-blue-600" size={20} />
                  Practice regularly to improve your fluency, vocabulary, and confidence in speaking English.
                </p>
              </CardContent>
            </Card>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center"
              onClick={handleStartPractice}
            >
              Start Your Practice Session
              <ChevronRight className="ml-2" size={20} />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}