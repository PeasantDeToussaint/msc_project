import React, { useState, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

const WritingPracticeTask2 = () => {
  const [timer, setTimer] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [response, setResponse] = useState('');
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState('');
  const [timeLimit, setTimeLimit] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const location = useLocation();
  const promptData = location.state?.prompt;
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer + 1 >= timeLimit * 60) {
          clearInterval(interval);
          setIsTimeUp(true);
          toast({
            description: "Time's up!",
          });
        }
        return prevTimer + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLimit, toast]);

  useEffect(() => {
    if (promptData) {
      setPrompt(promptData.question);
      setCategory(promptData.category);
      setTimeLimit(promptData.time_limit);
    }
  }, [promptData]);

  const handleResponseChange = (event) => {
    const text = event.target.value;
    setResponse(text);
    setWordCount(text.split(/\s+/).filter(word => word.length > 0).length);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
    console.log("Response submitted:", response);
    setIsSubmitted(true);
    toast({
      description: "Response submitted!",
    });
  };

  const handleViewResult = () => {
    // Navigate to the results page
    navigate('/results');
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <Toaster />
      <div className="w-full max-w-4xl p-8 md:p-12 lg:p-16 bg-card rounded-lg shadow-lg">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">Task 2 Practice</h1>
          <p className="text-sm text-muted-foreground">Write a 250-word response.</p>
        </div>
        <div className="bg-card-foreground p-6 rounded-md mb-8">
          <p className="text-sm text-primary-foreground font-medium">
            Topic: {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </p>
          <p className="text-sm text-primary-foreground font-medium">
            Question: {prompt || "Loading..."}
          </p>
          <p className="text-sm text-primary-foreground font-medium">
            Time Limit: {timeLimit} minutes
          </p>
        </div>
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="relative">
            <Textarea
              value={response}
              onChange={handleResponseChange}
              placeholder="Start writing your response here..."
              className="w-full h-[400px] text-sm p-4 rounded-md border border-input focus:border-primary focus:ring-1 focus:ring-primary"
              disabled={isTimeUp || isSubmitted}
            />
            <div className="absolute top-4 right-4 flex items-center gap-2 text-sm text-muted-foreground">
              <ClockIcon className="w-4 h-4" />
              <span id="timer">{formatTime(timer)}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <span id="word-count">{wordCount}</span> words
            </div>
            {isSubmitted ? (
              <Button onClick={handleViewResult}>View Result</Button>
            ) : (
              <Button type="submit" disabled={isTimeUp}>Submit</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default WritingPracticeTask2;

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
