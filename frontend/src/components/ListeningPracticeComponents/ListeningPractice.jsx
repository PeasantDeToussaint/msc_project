import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Play, Pause, SkipBack, SkipForward, Volume2, BarChart2, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
  </div>
);

const AudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const skip = (amount) => {
    if (audioRef.current) {
      audioRef.current.currentTime += amount;
    }
  };

  useEffect(() => {
    const audioUrl = `${BACKEND_URL}${src}`;
    console.log('Audio URL:', audioUrl);
    
    fetch(audioUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Audio file is accessible');
      })
      .catch(error => console.error('Error accessing audio file:', error));
  }, [src]);

  return (
    <Card>
      <CardContent className="p-6">
        <audio
          ref={audioRef}
          src={`${BACKEND_URL}${src}`}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onError={(e) => console.error('Audio loading error:', e)}
        />
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Button onClick={() => skip(-10)} variant="outline" size="icon">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button onClick={togglePlayPause} variant="outline" size="lg" className="w-20 h-20 rounded-full">
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
            </Button>
            <Button onClick={() => skip(5)} variant="outline" size="icon">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">{formatTime(currentTime)}</span>
            <Progress value={(currentTime / duration) * 100} className="flex-grow" />
            <span className="text-sm font-medium">{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
};

const QuestionCard = ({ question, userAnswer, showResult, onAnswer }) => {
  const renderQuestionContent = () => {
    const data = typeof question.data === 'string' ? JSON.parse(question.data) : question.data;
    switch (question.type) {
      case 'multiple_choice':
        return (
          <RadioGroup onValueChange={(value) => onAnswer(question.id, value)} value={userAnswer}>
            {data.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`q${question.id}-option-${index}`} />
                <Label htmlFor={`q${question.id}-option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case 'matching':
        return (
          <div className="space-y-2">
            {data.options && (
              <div className="mb-4">
                <p className="font-semibold">Options:</p>
                <ul className="list-disc pl-5">
                  {data.options.map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                </ul>
              </div>
            )}
            <Input
              value={userAnswer || ''}
              onChange={(e) => onAnswer(question.id, e.target.value)}
              placeholder="Enter your answer (e.g., A, B, C)"
              className="w-full"
            />
          </div>
        );
      case 'map_plan_diagram_labelling':
        return (
          <div className="space-y-4">
            {question.image_url && (
              <>
                <img 
                  src={`${BACKEND_URL}${question.image_url}`}
                  alt="Map or diagram to label"
                  className="w-full h-auto rounded-lg shadow-md mb-4"
                  onError={(e) => {
                    console.error('Image loading error:', e);
                    e.target.src = '/placeholder.svg?height=300&width=400';
                  }}
                />
                <p className="text-sm text-gray-500">Image URL: {`${BACKEND_URL}${question.image_url}`}</p>
              </>
            )}
            <Input
              value={userAnswer || ''}
              onChange={(e) => onAnswer(question.id, e.target.value)}
              placeholder="Enter label"
              className="w-full"
            />
          </div>
        );
      case 'form_table_flowchart_note_summary_completion':
      case 'sentence_completion':
      case 'short_answer':
        return (
          <Input
            value={userAnswer || ''}
            onChange={(e) => onAnswer(question.id, e.target.value)}
            placeholder="Enter your answer"
            className="w-full"
          />
        );
      default:
        return (
          <Input
            value={userAnswer || ''}
            onChange={(e) => onAnswer(question.id, e.target.value)}
            placeholder="Your answer"
            className="w-full"
          />
        );
    }
  };

  const data = typeof question.data === 'string' ? JSON.parse(question.data) : question.data;

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{data.question}</h3>
        {renderQuestionContent()}
        {showResult && (
          <div className={`mt-2 p-2 rounded-md ${userAnswer?.toLowerCase() === data.correct_answer.toLowerCase() ? 'bg-green-100' : 'bg-red-100'}`}>
            <p className="text-sm font-medium">
              {userAnswer?.toLowerCase() === data.correct_answer.toLowerCase()
                ? "Correct"
                : `Incorrect. Correct answer: ${data.correct_answer}`}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const ScoreOverview = ({ sectionScores, totalScore, onClose, testNumber }) => {
  const maxScore = 40;
  const percentage = (totalScore / maxScore) * 100;
  const bandScore = (totalScore / maxScore) * 9;

  const getScoreColor = (score) => {
    if (score >= 8) return "text-green-500";
    if (score >= 6.5) return "text-blue-500";
    if (score >= 5) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Your IELTS Listening Score - Test {testNumber}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
              className={`inline-flex items-center justify-center w-40 h-40 rounded-full border-8 ${getScoreColor(bandScore)} bg-white`}
            >
              <span className={`text-5xl font-bold ${getScoreColor(bandScore)}`}>
                {bandScore.toFixed(1)}
              </span>
            </motion.div>
            <p className="mt-2 text-xl font-semibold">Band Score</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {sectionScores.map((score, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-gray-100 p-4 rounded-lg"
              >
                <h3 className="text-lg font-semibold mb-2">Section {index + 1}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">{score}/10</span>
                  <Progress value={score * 10} className="w-1/2" />
                </div>
              </motion.div>
            ))}
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">Total Score</h3>
              <p className="text-sm text-gray-600">Out of 40 questions</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{totalScore}/{maxScore}</p>
              <p className="text-sm text-gray-600">{percentage.toFixed(1)}% correct</p>
            </div>
          </div>
          <Button onClick={onClose} className="w-full mt-4">Close</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Component() {
  const { testId } = useParams();
  const [testData, setTestData] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(Array(4).fill(false));
  const [sectionScores, setSectionScores] = useState([0, 0, 0, 0]);
  const [totalScore, setTotalScore] = useState(0);
  const [showScoreOverview, setShowScoreOverview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        setIsLoading(true);
        const url = `${BACKEND_URL}/listeningQuestions/${testId}`;
        console.log('Fetching test data from:', url);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch test data');
        }
        const data = await response.json();
        console.log('Received test data:', data);
        setTestData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching test data:', error);
        setError('Failed to load test data. Please try again later.');
        setIsLoading(false);
      }
    };

    if (testId) {
      fetchTestData();
    }
  }, [testId]);

  const handleAnswer = (questionId, answer) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const calculateScore = (sectionQuestions) => {
    return sectionQuestions.reduce((score, question) => {
      const data = typeof question.data === 'string' ? JSON.parse(question.data) : question.data;
      if (userAnswers[question.id]?.toLowerCase() === data.correct_answer.toLowerCase()) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  const handleCheckAnswers = (sectionIndex) => {
    const newShowResults = [...showResults];
    newShowResults[sectionIndex] = true;
    setShowResults(newShowResults);

    if (testData) {
      const sectionQuestions = testData.questions.filter(q => q.section === sectionIndex + 1);
      const sectionScore = calculateScore(sectionQuestions);
      const newSectionScores = [...sectionScores];
      newSectionScores[sectionIndex] = sectionScore;
      setSectionScores(newSectionScores);

      const newTotalScore = newSectionScores.reduce((a, b) => a + b, 0);
      setTotalScore(newTotalScore);
    }
  };

  const handleCalculateFinalScore = () => {
    if (testData) {
      testData.questions.forEach((question, index) => {
        const sectionIndex = Math.floor(index / 10);
        if (!showResults[sectionIndex]) {
          handleCheckAnswers(sectionIndex);
        }
      });
      setShowScoreOverview(true);
    }
  };

  const renderSection = (sectionIndex) => {
    if (!testData) return null;
    const section = testData.questions.filter(q => q.section === sectionIndex);
    return (
      <div className="space-y-4">
        {section.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            userAnswer={userAnswers[question.id] || ''}
            showResult={showResults[sectionIndex - 1]}
            onAnswer={handleAnswer}
          />
        ))}
        <Button 
          onClick={() => handleCheckAnswers(sectionIndex - 1)}
          className="w-full"
        >
          Check Answers
        </Button>
      </div>
    );
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!testData) {
    return <div className="text-center">No test data available.</div>;
  }

  const unansweredQuestions = testData.questions.filter(q => !userAnswers[q.id]).length;

  return (
    <div className="container mx-auto p-8 max-w-screen-xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">IELTS Listening Test {testData.audio.id}</h1>
        <p className="text-xl text-gray-600 mt-2">Complete all sections to get your score</p>
      </div>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-3 space-y-6">
          {testData && testData.audio && (
            <>
              <AudioPlayer src={testData.audio.file_path} />
              <p className="text-sm text-gray-500">Audio file path: {testData.audio.file_path}</p>
            </>
          )}
          <Card>
            <CardHeader>
              <CardTitle>Test {testData.audio.id} Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Listen carefully to the audio recording.</li>
                <li>You will hear the recording only once.</li>
                <li>Answer questions as you listen.</li>
                <li>You have 10 minutes at the end to check your answers.</li>
                <li>Each section contains 10 questions.</li>
              </ul>
            </CardContent>
          </Card>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                <BarChart2 className="mr-2 h-4 w-4" />
                Calculate Final Score
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Calculate Final Score for Test {testData.audio.id}</AlertDialogTitle>
                <AlertDialogDescription>
                  {unansweredQuestions > 0 ? (
                    <>
                      <AlertTriangle className="h-6 w-6 text-yellow-500 inline-block mr-2" />
                      You have {unansweredQuestions} unanswered questions. Are you sure you want to calculate your final score?
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-6 w-6 text-green-500 inline-block mr-2" />
                      All questions have been answered. Do you want to calculate your final score?
                    </>
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleCalculateFinalScore}>
                  Calculate Score
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="col-span-9">
          <Tabs defaultValue="section1" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="section1">Part 1</TabsTrigger>
              <TabsTrigger value="section2">Part 2</TabsTrigger>
              <TabsTrigger value="section3">Part 3</TabsTrigger>
              <TabsTrigger value="section4">Part 4</TabsTrigger>
            </TabsList>
            <ScrollArea className="h-[calc(100vh-200px)] pr-4">
              <TabsContent value="section1">{renderSection(1)}</TabsContent>
              <TabsContent value="section2">{renderSection(2)}</TabsContent>
              <TabsContent value="section3">{renderSection(3)}</TabsContent>
              <TabsContent value="section4">{renderSection(4)}</TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      </div>
      <AnimatePresence>
        {showScoreOverview && (
          <ScoreOverview 
            sectionScores={sectionScores} 
            totalScore={totalScore} 
            onClose={() => setShowScoreOverview(false)}
            testNumber={testData.audio.id}
          />
        )}
      </AnimatePresence>
    </div>
  );
}