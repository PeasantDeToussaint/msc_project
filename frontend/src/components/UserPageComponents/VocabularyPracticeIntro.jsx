import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Puzzle, 
  List, 
  AlignJustify 
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const practiceTypes = [
  { name: "Find the Real Words", icon: Puzzle },
  { name: "Definition Matching", icon: List },
  { name: "Listen and Write", icon: AlignJustify }
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
  const navigate = useNavigate(); // useNavigate inside the functional component

  const handleCardClick = (name) => {
    if (name === "Find the Real Words") {
      navigate("/FindRealWord");
    } else if (name === "Listen and Write") {
      navigate("/ListenAndWrite");
    } else if (name === "Definition Matching") {
      navigate("/DefinitionMatching");
    } else {
      console.log("Invalid type");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-background">
      <motion.div 
        className="w-full max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {practiceTypes.map(({ name, icon: Icon }) => (
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
