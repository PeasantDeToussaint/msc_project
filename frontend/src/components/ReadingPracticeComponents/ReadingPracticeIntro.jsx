"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BookOpen, 
  Puzzle, 
  Table, 
  AlignJustify, 
  CheckSquare, 
  Edit3, 
  FileText
} from 'lucide-react'

const questionTypes = [
  { name: "Matching Features", icon: Puzzle },
  { name: "Table Completion", icon: Table },
  { name: "Matching Sentence Endings", icon: AlignJustify },
  { name: "Multiple Choice", icon: CheckSquare },
  { name: "Sentence Completion", icon: Edit3 },
  { name: "Summary Completion", icon: FileText },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
}

export default function Component() {
  const handleCardClick = (type) => {
    window.location.href = `/ReadingPractice?selectedType=${encodeURIComponent(type)}&questionCount=1`
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <motion.div 
        className="w-full max-w-4xl space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center" variants={itemVariants}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <BookOpen className="mx-auto h-16 w-16 text-primary" />
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {questionTypes.map(({ name, icon: Icon }) => (
            <motion.div key={name} variants={itemVariants}>
              <Card 
                className="shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full"
                onClick={() => handleCardClick(name)}
              >
                <CardHeader className="p-6 flex flex-col items-center">
                  <Icon className="h-12 w-12 mb-4 text-primary" />
                  <CardTitle className="text-center text-lg">{name}</CardTitle>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}