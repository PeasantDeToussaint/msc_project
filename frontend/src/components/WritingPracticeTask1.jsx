import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function WritingPracticeTask1() {
  const location = useLocation();
  const navigate = useNavigate();
  const prompt = location.state?.prompt;

  if (!prompt) {
    navigate("/IELTSTask1Practice");
    return null;
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const [timeRemaining, setTimeRemaining] = useState(1200); // 20 minutes in seconds
  const [response, setResponse] = useState("");
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleWordCount = (event) => {
    const text = event.target.value;
    setResponse(text);
    setWordCount(text.split(/\s+/).filter((word) => word.length > 0).length);
  };

  const handleSubmit = () => {
    navigate("/WritingPracticeTask1Feedback", {
      state: {
        prompt: prompt.question,
        response: response,
        image_url: prompt.image_url,
      },
    });
  };

  const handleBackToIntro = () => {
    navigate("/WritingPracticeTask1Intro");
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
          {prompt.image_url ? (
            <img
              src={`http://localhost:3000/uploads/${prompt.image_url}`}
              alt="Prompt"
              className="w-full h-auto object-contain rounded-lg"
              style={{ aspectRatio: "800/450" }}
            />
          ) : (
            <p>No images available for this prompt.</p>
          )}
          <div className="bg-card rounded-lg p-4 shadow-lg">
            <h2 className="text-lg font-bold mb-3">Your task:</h2>
            <p className="text-muted-foreground">{prompt.question}</p>
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
            onChange={handleWordCount}
          />
          <div className="mt-2 text-muted-foreground text-xs">
            Word Count: <span id="word-count">{wordCount}</span>
          </div>
          <div className="mt-4 flex justify-end">
            <Button type="button" onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <Button onClick={handleBackToIntro} variant="secondary">
            Return to Previous Page
          </Button>
        </div>
      </div>
    </div>
  );
}
