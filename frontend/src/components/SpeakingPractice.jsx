import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Progress } from "@/components/ui/progress";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const SpeakingPractice = () => {
  const [questions, setQuestions] = useState({ part1: [], part2: [], part3: [] });
  const [recording, setRecording] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [completedRecordings, setCompletedRecordings] = useState([]);
  const timerRef = useRef(null);
  const location = useLocation();
  const { toast } = useToast();
  const selectedTopics = location.state?.selectedTopics || { part1: [], part2: [], part3: [] };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log('Fetching questions with selected topics:', selectedTopics);

        const response = await fetch('http://localhost:3000/speakingQuestions/selected-questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(selectedTopics)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setQuestions(selectOneQuestionPerGenre(data));
      } catch (error) {
        console.error('Error fetching questions:', error);
        toast({
          title: 'Error',
          description: `Failed to fetch questions: ${error.message}`,
          status: 'error'
        });
      }
    };

    if (selectedTopics.part1.length > 0 && selectedTopics.part2.length > 0 && selectedTopics.part3.length > 0) {
      fetchQuestions();
    }
  }, [selectedTopics, toast]);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(timerRef.current);
      setIsRecording(false);
      setCompletedRecordings((prev) => [...prev, recording.id]);
      toast({
        title: "Recording Completed",
        description: "Your recording is complete.",
        status: "success"
      });
    }
  }, [timeLeft, recording, toast]);

  const selectOneQuestionPerGenre = (data) => {
    const selectRandomQuestion = (questions) => {
      const groupedQuestions = questions.reduce((acc, question) => {
        if (!acc[question.genre]) {
          acc[question.genre] = [];
        }
        acc[question.genre].push(question);
        return acc;
      }, {});
      return Object.values(groupedQuestions).map(genreQuestions => genreQuestions[Math.floor(Math.random() * genreQuestions.length)]);
    };

    return {
      part1: selectRandomQuestion(data.part1),
      part2: selectRandomQuestion(data.part2),
      part3: selectRandomQuestion(data.part3),
    };
  };

  const handleRecordClick = (question) => {
    if (isRecording) {
      toast({
        title: "Recording in Progress",
        description: "Please wait until the current recording is completed.",
        status: "warning"
      });
      return;
    }

    if (completedRecordings.includes(question.id)) {
      toast({
        title: "Recording Already Completed",
        description: "You have already completed recording for this question.",
        status: "info"
      });
      return;
    }

    setIsRecording(true);
    setRecording(question);
    setTimeLeft(question.time_limit);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
  };

  const handleSubmit = () => {
    toast({
      title: "Recordings Submitted",
      description: "All your recordings have been submitted.",
      status: "success"
    });
    // Add your submission logic here
  };

  const renderQuestions = (questions, part) => {
    if (!questions[part] || questions[part].length === 0) {
      return <p>No questions available for this section.</p>;
    }
    return questions[part].map((question, index) => (
      <div key={question.id}>
        <Toaster />
        <h3 className="text-base font-semibold mb-2">Question {index + 1}</h3>
        <div className="flex flex-col gap-2">
          <p className="text-sm">{question.question}</p>
          <div className="bg-muted rounded-md p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Record your response</span>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-xs">Time limit: {question.time_limit}s</span>
                <button
                  className={`bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary ${isRecording && recording?.id !== question.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handleRecordClick(question)}
                  disabled={isRecording && recording?.id !== question.id}
                >
                  {completedRecordings.includes(question.id) ? '✓' : isRecording && recording?.id === question.id ? 'Recording...' : 'Record'}
                </button>
              </div>
            </div>
            {isRecording && recording?.id === question.id && (
              <div className="mt-4">
                <Progress value={(timeLeft / question.time_limit) * 100} aria-label="Recording progress" />
                <p className="text-center mt-2 text-sm">{timeLeft} seconds left</p>
              </div>
            )}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl font-bold mb-6">IELTS Speaking Exam</h1>
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold mb-4">Part 1</h2>
            <div className="space-y-4">
              {renderQuestions(questions, 'part1')}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">Part 2</h2>
            <div className="space-y-4">
              {renderQuestions(questions, 'part2')}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">Part 3</h2>
            <div className="space-y-4">
              {renderQuestions(questions, 'part3')}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Button 
            className="w-full sm:w-auto" 
            onClick={handleSubmit} 
            disabled={isRecording || completedRecordings.length < Object.keys(questions).reduce((acc, part) => acc + questions[part].length, 0)}
          >
            Submit Your Recordings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpeakingPractice;
