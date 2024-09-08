'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Mic, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const PracticeCard = ({ onClick }) => (
  <Card 
    className="bg-white shadow-lg overflow-hidden h-full flex flex-col cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    onClick={onClick}
  >
    <CardContent className="p-6 flex-grow flex flex-col justify-between items-center">
      <Mic className="h-16 w-16 text-blue-600 mb-4" />
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-stone-800">Interactive Session</h3>
      </div>
    </CardContent>
  </Card>
)

export default function TopicSelection() {
  const navigate = useNavigate()

  const handleStartPractice = () => {
    navigate('/SpeakingPracticeRandom')
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <motion.div 
        className="max-w-sm mx-auto space-y-8 relative z-10"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <PracticeCard onClick={handleStartPractice} />
      </motion.div>
    </div>
  )
}