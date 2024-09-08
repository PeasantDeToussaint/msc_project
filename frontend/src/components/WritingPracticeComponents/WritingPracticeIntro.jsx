import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Pen, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const TaskCard = ({ title, icon: Icon, onClick }) => (
  <Card 
    className="bg-white shadow-lg overflow-hidden h-full flex flex-col cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    onClick={onClick}
  >
    <CardContent className="space-y-6 p-6 flex-grow flex flex-col justify-center items-center">
      <Icon className="h-12 w-12 text-blue-600 mb-4" />
      <h3 className="text-xl font-semibold text-stone-800 text-center">{title}</h3>
    </CardContent>
  </Card>
)

const writingTasks = [
  {
    title: "Task 1: Report",
    icon: FileText,
    route: '/WritingPracticeTask1Intro'
  },
  {
    title: "Task 2: Essay",
    icon: FileText,
    route: '/WritingPracticeTask2Intro'
  }
]

export default function WritingPractice() {
  const navigate = useNavigate()

  const handleTaskClick = (route) => {
    navigate(route)
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <motion.div 
        className="max-w-4xl mx-auto space-y-8 relative z-10"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <Pen className="mx-auto h-16 w-16 text-blue-600" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {writingTasks.map((task, index) => (
            <TaskCard
              key={index}
              title={task.title}
              icon={task.icon}
              onClick={() => handleTaskClick(task.route)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}