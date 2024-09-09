'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, CheckCircle, XCircle } from 'lucide-react'

const BASE_URL = import.meta.env.VITE_BASE_URL || `http://localhost:${import.meta.env.ALLOCATED_PORT}`;

const fetchVocabularyList = async (listId) => {
  try {
    const response = await fetch(`${BASE_URL}/wordList/wordList/${listId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch vocabulary list');
    }
    const data = await response.json();
    return data.map(item => ({
      vocabulary: item.vocabulary,
      definition: item.definition,
      isReal: true
    }));
  } catch (error) {
    console.error('Error fetching vocabulary list:', error);
    throw error;
  }
}

const fetchFakeWords = async (count) => {
  try {
    const response = await fetch(`${BASE_URL}/wordList/fakeWords/${count}`);
    if (!response.ok) {
      throw new Error('Failed to fetch fake words');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching fake words:', error);
    throw error;
  }
}

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
  const [allWords, setAllWords] = useState([])
  const [currentWords, setCurrentWords] = useState([])
  const [selectedWords, setSelectedWords] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [showDefinition, setShowDefinition] = useState(null)
  const [selectedList, setSelectedList] = useState('1')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load new words when the component mounts or the selected list changes
  useEffect(() => {
    loadNewWords();
  }, [selectedList]);

  const loadNewWords = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [realWords, fakeWords] = await Promise.all([
        fetchVocabularyList(selectedList),
        fetchFakeWords(4)
      ]);
      const labeledRealWords = realWords.slice(0, 8);
      const labeledFakeWords = fakeWords.map(word => ({ ...word, isReal: false }));
      const combinedWords = [...labeledRealWords, ...labeledFakeWords];
      generateNewSet(combinedWords);
    } catch (err) {
      setError('Failed to load vocabulary list. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!showResults && !isLoading) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showResults, isLoading]);

  const generateNewSet = (words = allWords) => {
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    setCurrentWords(shuffled.slice(0, 12));
    setSelectedWords([]);
    setShowResults(false);
    setTimeLeft(60);
    setShowDefinition(null);
  };

  const handleWordClick = (word) => {
    if (showResults) {
      const selectedWord = currentWords.find(w => w.vocabulary === word);
      if (selectedWord && selectedWord.definition) {
        setShowDefinition(selectedWord);
      }
      return;
    }
    setSelectedWords(prev => 
      prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]
    );
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleNextSet = () => {
    loadNewWords();  // Fetch new words on each new set
  };

  const handleListChange = (value) => {
    setSelectedList(value);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-background">
      <motion.div 
        className="w-full max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex justify-between items-center mb-8">
          <Select onValueChange={handleListChange} value={selectedList}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select word list" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 40 }, (_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  List {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center bg-primary text-primary-foreground rounded-full px-4 py-2">
            <Clock className="mr-2 h-5 w-5" />
            <span className="text-2xl font-bold">{timeLeft}s</span>
          </div>
        </div>
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          <AnimatePresence mode="wait">
            {currentWords.map((word) => (
              <motion.div key={word.vocabulary} variants={itemVariants} layout>
                <Card 
                  className={`shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer ${
                    selectedWords.includes(word.vocabulary) ? 'border-primary border-2' : ''
                  } ${showResults ? (word.isReal ? 'bg-green-100' : 'bg-red-100') : ''}`}
                  onClick={() => handleWordClick(word.vocabulary)}
                >
                  <CardHeader className="p-6 flex flex-col items-center justify-center h-40">
                    <p className="text-center text-2xl font-medium">{word.vocabulary}</p>
                    {showResults && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="mt-4"
                      >
                        {word.isReal ? (
                          <CheckCircle className="h-8 w-8 text-green-500" />
                        ) : (
                          <XCircle className="h-8 w-8 text-red-500" />
                        )}
                      </motion.div>
                    )}
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <div className="mt-8 flex justify-center">
          {!showResults ? (
            <Button onClick={handleSubmit} size="lg" className="text-lg px-8 py-6">
              Submit Answers
            </Button>
          ) : (
            <Button onClick={handleNextSet} size="lg" className="text-lg px-8 py-6">
              Next Set
            </Button>
          )}
        </div>
      </motion.div>
      <Dialog open={showDefinition !== null} onOpenChange={() => setShowDefinition(null)}>
        <DialogContent className="sm:max-w-[425px]" onClick={() => setShowDefinition(null)}>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">{showDefinition?.vocabulary}</h3>
            <p className="text-lg">{showDefinition?.definition}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
