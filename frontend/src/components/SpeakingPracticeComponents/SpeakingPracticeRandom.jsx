'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Progress } from "@/components/ui/progress"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, Square, RotateCcw, Volume2, Home, Settings } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const topics = {
  part1: [
    'Sports', 'TV', 'Timing', 'Newspaper And Magazine', 'Clothes, Fashion & Photos',
    'Movies', 'Major', 'Trees', 'Email', 'Family & Housework', 'Neighbours', 'Gift & Noise',
    'Volunteer Works', 'Public Transport', 'Dreams', 'Celebrity', 'Work', 'Weather', 'Birthdays',
    'Daily Routine', 'The Sea', 'Friends', 'Country', 'Lifestyle', 'Exercise', 'Dictionaries',
    'Mobile Phones', 'Patience & Politeness', 'Travel', 'Writing', 'Food', 'Musical Instruments',
    'Music', 'Animals', 'Home', 'Outdoor Activities', 'High School', 'Advertisements',
    'Indoor Activities & Transportation', 'Flowers', 'Accommodation', 'Internet', 'Museums',
    'Computer', 'Colours', 'Bags & Boat', 'Books', 'Art & Photography', 'Humour', 'Hometown', 'Seasons'
  ],
  part2: [
    'Holiday', 'Furniture', 'Sports', 'Products', 'Money', 'Music', 'Social Problems', 'Hobbies',
    'Change', 'Entertainment', 'Home', 'A Person You Know', 'Rules', 'Parenting', 'Exciting Experience',
    'Restaurants', 'Apologising', 'Party', 'Advertisements', 'News', 'Late', 'Plans', 'School',
    'Family', 'Lake/River', 'Environment', 'Animal', 'Influence', 'History', 'Machine', 'Buildings',
    'Presents or Gifts', 'Help', 'Daily Routine', 'Internet', 'Friends', 'Gifts', 'Reading', 'Festival',
    'Exercise', 'Memory', 'Language', 'Clothes', 'Business', 'Decision', 'Art', 'Books', 'City',
    'Electronic Devices', 'Garden', 'Health', 'Memories', 'Science', 'Hometown', 'Food', 'Company',
    'Something Difficult To Use', 'Mobile phone', 'A Challenging Thing You Did', 'Shopping'
  ],
  part3: [
    'Education', 'Holiday', 'Furniture', 'Sports', 'Products', 'Social Problems', 'Change',
    'Entertainment', 'Events', 'TV', 'Parenting', 'Exciting Experience', 'Technology', 'Party',
    'Eating habits', 'Job', 'Plans', 'Transport', 'Family', 'Traditional Products', 'Text Message',
    'Work', 'History', 'Machine', 'Things', 'Help', 'Daily Routine', 'A Member of A Team', 'Friends',
    'Festival', 'Teacher', 'City', 'Travel', 'Health', 'Food', 'Company', 'Shopping', 'Money', 'Music',
    'Animals', 'Home', 'Rules', 'Restaurants', 'Desired Change to Local Area', 'Advertisements', 
    'Mobile phones', 'Time When Someone Apologised to You', 'Leisure activities', 'News', 'Late',
    'School', 'Environment', 'Influence', 'Vegetables', 'Internet', 'Study', 'Memory', 'Clothes',
    'Personal', 'Business', 'Decision', 'Art', 'Books', 'Electronic Devices', 'Something Difficult to Use',
    'Science', 'A Challenging Thing You Did'
  ]
};

function useAudioRecorder(timeLimitInSeconds) {
  const [isRecording, setIsRecording] = useState(false)
  const [timeLeft, setTimeLeft] = useState(timeLimitInSeconds)
  const [audioBlobs, setAudioBlobs] = useState([])
  const [capturedStream, setCapturedStream] = useState(null)

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
        }
      })

      setAudioBlobs([])
      setCapturedStream(stream)
      setIsRecording(true)
      setTimeLeft(timeLimitInSeconds)

      const recorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm'
      })

      recorder.addEventListener('dataavailable', event => {
        setAudioBlobs(prevBlobs => [...prevBlobs, event.data])
      })

      recorder.start(1000)

      const timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timer)
            recorder.stop()
            setIsRecording(false)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)

      return () => {
        clearInterval(timer)
        recorder.stop()
        stream.getTracks().forEach(track => track.stop())
      }
    } catch (error) {
      console.error('Error starting recording:', error)
      throw error
    }
  }, [timeLimitInSeconds])

  const stopRecording = useCallback(() => {
    return new Promise(resolve => {
      if (capturedStream) {
        capturedStream.getTracks().forEach(track => track.stop())
      }
      setIsRecording(false)
      const audioBlob = new Blob(audioBlobs, { type: 'audio/webm' })
      resolve(audioBlob)
    })
  }, [audioBlobs, capturedStream])

  return {
    isRecording,
    timeLeft,
    startRecording,
    stopRecording
  }
}

const QuestionCard = ({ question }) => (
  <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 shadow-lg">
    <CardHeader>
      <CardTitle className="text-lg text-primary">Question</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm font-medium">{question}</p>
    </CardContent>
  </Card>
)

const RecordingControls = ({ isRecording, onRecord, onStop }) => (
  <div className="flex items-center justify-center gap-4">
    <Button
      onClick={onRecord}
      disabled={isRecording}
      className={`gap-2 ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'} transition-colors duration-200`}
      size="lg"
    >
      <Mic className="h-5 w-5" />
      {isRecording ? 'Recording...' : 'Start Recording'}
    </Button>
    {isRecording && (
      <Button
        variant="outline"
        onClick={onStop}
        className="gap-2"
        size="lg"
      >
        <Square className="h-5 w-5" />
        Stop
      </Button>
    )}
  </div>
)

const RecordingProgress = ({ timeLeft, totalTime }) => (
  <div className="space-y-4">
    <Progress value={(timeLeft / totalTime) * 100} className="w-full h-2" />
    <p className="text-center text-sm font-medium">{timeLeft} seconds remaining</p>
  </div>
)

const TranscriptionCard = ({ transcription }) => (
  <Card className="bg-gradient-to-br from-secondary/10 to-primary/10 shadow-lg">
    <CardHeader>
      <CardTitle className="text-lg text-secondary">Transcription</CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-[200px] w-full rounded-md border p-4 bg-background/50 backdrop-blur-sm">
        <p className="text-sm">{transcription}</p>
      </ScrollArea>
    </CardContent>
  </Card>
)

const FeedbackCard = ({ feedback }) => (
  <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 shadow-lg">
    <CardHeader>
      <CardTitle className="text-lg text-secondary">Feedback</CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-[200px] w-full rounded-md border p-4 bg-background/50 backdrop-blur-sm">
        <p className="text-sm font-medium">Overall Score: {feedback.overallScore}</p>
        <p className="text-sm mt-2">Task Response: {feedback.taskResponse.text} (Score: {feedback.taskResponse.score})</p>
        <p className="text-sm mt-2">Coherence and Cohesion: {feedback.coherenceAndCohesion.text} (Score: {feedback.coherenceAndCohesion.score})</p>
        <p className="text-sm mt-2">Lexical Resource: {feedback.lexicalResource.text} (Score: {feedback.lexicalResource.score})</p>
        <p className="text-sm mt-2">Grammatical Range and Accuracy: {feedback.grammaticalRangeAndAccuracy.text} (Score: {feedback.grammaticalRangeAndAccuracy.score})</p>
      </ScrollArea>
    </CardContent>
  </Card>
)

const TopicSelection = ({ selectedTopics, onTopicChange }) => {
  return (
    <Tabs defaultValue="part1">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="part1">Part 1</TabsTrigger>
        <TabsTrigger value="part2">Part 2</TabsTrigger>
        <TabsTrigger value="part3">Part 3</TabsTrigger>
      </TabsList>
      {Object.entries(topics).map(([part, topicList]) => (
        <TabsContent key={part} value={part}>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            <div className="grid grid-cols-2 gap-4">
              {topicList.map((topic) => (
                <div key={topic} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${part}-${topic}`}
                    checked={selectedTopics[part].includes(topic)}
                    onCheckedChange={(checked) => onTopicChange(part, topic, checked)}
                  />
                  <Label htmlFor={`${part}-${topic}`}>{topic}</Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default function Component() {
  const [questions, setQuestions] = useState({ part1: null, part2: null, part3: null })
  const [currentPart, setCurrentPart] = useState('part1')
  const [transcription, setTranscription] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [selectedTopics, setSelectedTopics] = useState({ part1: [], part2: [], part3: [] })
  const { toast } = useToast()
  const navigate = useNavigate()

  const {
    isRecording,
    timeLeft,
    startRecording,
    stopRecording
  } = useAudioRecorder(questions[currentPart]?.time_limit || 0)

  const fetchQuestions = useCallback(async (topicsToFetch = null) => {
    try {
      const endpoint = topicsToFetch ? 'http://localhost:3000/speakingQuestions/selected-questions' : 'http://localhost:3000/speakingQuestions/random-questions'
      const method = topicsToFetch ? 'POST' : 'GET'
      const body = topicsToFetch ? JSON.stringify(topicsToFetch) : undefined
      const headers = topicsToFetch ? { 'Content-Type': 'application/json' } : undefined

      const response = await fetch(endpoint, { method, body, headers })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      setQuestions({
        part1: data.part1[0],
        part2: data.part2[0],
        part3: data.part3[0]
      })
      setTranscription('')
      setFeedback(null)
    } catch (error) {
      console.error('Error fetching questions:', error)
      toast({
        title: 'Error',
        description: `Failed to fetch questions: ${error.message}`,
        variant: 'destructive'
      })
    }
  }, [toast])

  useEffect(() => {
    fetchQuestions()
  }, [fetchQuestions])

  const handleRecordClick = async () => {
    if (isRecording) {
      toast({
        title: "Recording in Progress",
        description: "Please wait until the current recording is completed.",
        variant: "warning"
      })
      return
    }

    setTranscription('')
    setFeedback(null)
    await startRecording()
  }

  const handleStopRecording = async () => {
    const audioBlob = await stopRecording()

    if (!audioBlob || audioBlob.size === 0) {
      toast({
        title: 'Error',
        description: "Failed to process audio: Invalid audio blob",
        variant: 'destructive'
      })
      return
    }

    const formData = new FormData()
    formData.append('audio', audioBlob, 'audio.wav')

    try {
      const response = await fetch('http://localhost:3000/audio/process-audio', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        setTranscription(data.transcription)
        toast({
          title: "Transcription Completed",
          description: "Your audio has been transcribed.",
        })

        // Fetch feedback using the transcribed text
        const feedbackResponse = await fetch('http://localhost:3000/transcription/processTranscription', {
          metho: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ transcription: data.transcription })
        })

        if (feedbackResponse.ok) {
          const feedbackData = await feedbackResponse.json()
          setFeedback(feedbackData)
          toast({
            title: "Feedback Received",
            description: "Your feedback has been successfully retrieved.",
          })
        } else {
          throw new Error(`HTTP error! Status: ${feedbackResponse.status}`)
        }

      } else {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to process audio: ${error.message}`,
        variant: 'destructive'
      })
    }
  }

  const handleNavigateHome = () => {
    navigate('/')
  }

  const handleTopicChange = (part, topic, checked) => {
    setSelectedTopics((prev) => {
      const newSelected = { ...prev };
      if (checked) {
        newSelected[part].push(topic);
      } else {
        newSelected[part] = newSelected[part].filter((t) => t !== topic);
      }
      return newSelected;
    });
  }

  const handleApplyTopics = () => {
    if (selectedTopics.part1.length < 1 || selectedTopics.part2.length < 1 || selectedTopics.part3.length < 1) {
      toast({
        title: "Selection Error",
        description: "You must choose at least one topic from each section.",
        variant: "destructive"
      });
    } else {
      fetchQuestions(selectedTopics);
    }
  }

  const handleNewQuestion = () => {
    fetchQuestions()
  }

  const currentQuestion = questions[currentPart]

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
      <Toaster />
      <Card className="max-w-4xl mx-auto bg-gradient-to-br from-background to-muted">
        <CardContent className="space-y-8 pt-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={handleNavigateHome} className="gap-2">
                <Home className="h-5 w-5" />
                <span className="sr-only">Back to Home</span>
              </Button>
            </div>
            <Badge variant="outline" className="text-sm">IELTS Speaking Practice</Badge>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleNewQuestion} size="icon" title="Get a new question">
                <RotateCcw className="h-4 w-4" />
                <span className="sr-only">Get a new question</span>
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                    <span className="sr-only">Open settings</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Topic Selection</SheetTitle>
                    <SheetDescription>
                      Choose topics for each part of the IELTS Speaking test
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <TopicSelection
                      selectedTopics={selectedTopics}
                      onTopicChange={handleTopicChange}
                    />
                  </div>
                  <Button onClick={handleApplyTopics} className="w-full mt-4">
                    Apply Topics
                  </Button>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <Tabs value={currentPart} onValueChange={setCurrentPart} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="part1" className="text-sm md:text-base">Part 1</TabsTrigger>
              <TabsTrigger value="part2" className="text-sm md:text-base">Part 2</TabsTrigger>
              <TabsTrigger value="part3" className="text-sm md:text-base">Part 3</TabsTrigger>
            </TabsList>
            <TabsContent value="part1">
              <Badge variant="secondary" className="mb-4">Introduction and Interview</Badge>
            </TabsContent>
            <TabsContent value="part2">
              <Badge variant="secondary" className="mb-4">Individual Long Turn</Badge>
            </TabsContent>
            <TabsContent value="part3">
              <Badge variant="secondary" className="mb-4">Two-way Discussion</Badge>
            </TabsContent>
          </Tabs>
          {currentQuestion && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <QuestionCard question={currentQuestion.question} />
              <Card className="bg-gradient-to-br from-muted/50 to-background/50 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Volume2 className="h-5 w-5 text-primary" />
                    Recording
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RecordingControls
                    isRecording={isRecording}
                    onRecord={handleRecordClick}
                    onStop={handleStopRecording}
                  />
                  <AnimatePresence>
                    {isRecording && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <RecordingProgress
                          timeLeft={timeLeft}
                          totalTime={currentQuestion.time_limit}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
              <AnimatePresence>
                {transcription && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <TranscriptionCard transcription={transcription} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FeedbackCard feedback={feedback} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}