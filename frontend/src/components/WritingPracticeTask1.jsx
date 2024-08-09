import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Component() {
  const [timeRemaining, setTimeRemaining] = useState(1200); // 20 minutes in seconds
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleBackToIntro = () => {
    navigate('/WritingPracticeTask1Intro.jsx'); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="container max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">IELTS Task 1 Practice</h1>
          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-md font-medium text-sm">
            <span className="mr-1">Time Remaining:</span>
            <span className="font-bold">{formatTime(timeRemaining)}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <img
            src="/placeholder.svg"
            width="800"
            height="450"
            alt="IELTS Task 1 Graph"
            className="w-full h-auto object-cover rounded-lg"
            style={{ aspectRatio: "800/450", objectFit: "cover" }}
          />
          <div className="bg-card rounded-lg p-4 shadow-lg">
            <h2 className="text-lg font-bold mb-3">Question Prompt</h2>
            <p className="text-muted-foreground">
              The graph below shows the number of visitors to a national park over a 12-month period. Summarize the
              information by selecting and reporting the main features, and make comparisons where relevant.
            </p>
          </div>
        </div>
        <div className="mt-6 bg-card rounded-lg p-4 shadow-lg">
          <label htmlFor="response" className="block text-muted-foreground font-medium mb-2 text-sm">
            Your Response:
          </label>
          <Textarea
            id="response"
            name="response"
            rows={12}
            placeholder="Type your response here..."
            className="w-full bg-background border-input rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <div className="mt-2 text-muted-foreground text-xs">
            Word Count: <span id="word-count">0</span>
          </div>
          <div className="mt-4 flex justify-between">
            <Button type="button" variant="destructive">
              Quit
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <Button onClick={handleBackToIntro} variant="secondary">
            Back to Intro
          </Button>
        </div>
      </div>
    </div>
  );
}
