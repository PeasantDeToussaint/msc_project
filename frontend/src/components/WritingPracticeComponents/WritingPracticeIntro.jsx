'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pen, FileText, ChevronRight } from 'lucide-react'
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

const TaskCard = ({ title, description, icon: Icon, onClick }) => (
  <Card className="bg-white shadow-lg overflow-hidden border-t-4 border-blue-500 h-full flex flex-col">
    <CardContent className="space-y-6 p-6 flex-grow flex flex-col justify-between">
      <div>
        <Icon className="mx-auto h-12 w-12 text-blue-600 mb-4" />
        <h3 className="text-2xl font-semibold text-stone-800 text-center mb-4">{title}</h3>
        <p className="text-stone-600 text-center">{description}</p>
      </div>
      <Button 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center mt-6"
        onClick={onClick}
      >
        Start Practice
        <ChevronRight className="ml-2" size={20} />
      </Button>
    </CardContent>
  </Card>
)

export default function WritingPractice() {
  const navigate = useNavigate()

  const handleTask1Click = () => {
    navigate('/WritingPracticeTask1Intro')
  }

  const handleTask2Click = () => {
    navigate('/WritingPracticeTask2Intro')
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      <AnimatedBackground />
      <motion.div 
        className="max-w-6xl mx-auto space-y-8 relative z-10"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Card className="bg-white shadow-lg overflow-hidden border-t-4 border-blue-500">
          <CardHeader className="bg-stone-50 border-b border-stone-200">
            <CardTitle className="text-3xl font-bold tracking-tight sm:text-4xl text-center text-stone-800">Writing Practice</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="text-center">
              <Pen className="mx-auto h-16 w-16 text-blue-600" />
              <p className="mt-2 text-xl text-stone-600">
                IELTS Writing Test lasts for 60 minutes, and you will need to complete two writing tasks.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <TaskCard
                title="Practice Task 1"
                description="Write a report summarizing, describing, or explaining visual information (graphs, charts, tables, etc.) in at least 150 words."
                icon={FileText}
                onClick={handleTask1Click}
              />
              <TaskCard
                title="Practice Task 2"
                description="Write an essay responding to a point of view, argument, or problem in at least 250 words."
                icon={FileText}
                onClick={handleTask2Click}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}