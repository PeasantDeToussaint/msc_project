import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSpring, animated, config } from 'react-spring';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Clock, ArrowLeft, Send } from 'lucide-react';

const FloatingObject = ({ delay, style }) => {
  const props = useSpring({
    loop: true,
    from: { transform: 'translate3d(0,0px,0)' },
    to: [
      { transform: 'translate3d(0,20px,0)' },
      { transform: 'translate3d(0,-20px,0)' },
    ],
    config: {
      duration: 2000 + delay,
    },
  });

  return (
    <animated.div
      style={{
        ...props,
        ...style,
        position: 'absolute',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
      }}
    />
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#DB2777" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#gradient)" opacity="0.3" />
      </svg>
      <FloatingObject delay={0} style={{ top: '10%', left: '10%' }} />
      <FloatingObject delay={500} style={{ top: '20%', right: '20%' }} />
      <FloatingObject delay={1000} style={{ bottom: '15%', left: '30%' }} />
      <FloatingObject delay={1500} style={{ bottom: '25%', right: '15%' }} />
    </div>
  );
};

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

  const contentAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.molasses,
  });

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 relative">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <animated.div style={contentAnimation} className="max-w-4xl mx-auto space-y-8 relative z-10">
        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">IELTS Task 1 Practice</h1>
              <div className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-full">
                <Clock className="w-5 h-5" />
                <span className="font-bold">{formatTime(timeRemaining)}</span>
              </div>
            </div>
            <div className="space-y-6">
              {prompt.image_url ? (
                <img
                  src={`http://localhost:3000/uploads/${prompt.image_url}`}
                  alt="Prompt"
                  className="w-full h-auto object-contain rounded-lg"
                  style={{ aspectRatio: "800/450" }}
                />
              ) : (
                <p className="text-gray-600">No images available for this prompt.</p>
              )}
              <div className="bg-gray-100 rounded-lg p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-2">Your task:</h2>
                <p className="text-gray-600">{prompt.question}</p>
              </div>
              <div>
                <label htmlFor="response" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Response:
                </label>
                <Textarea
                  id="response"
                  name="response"
                  rows={12}
                  placeholder="Type your response here..."
                  className="w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={handleWordCount}
                />
                <div className="mt-2 text-sm text-gray-500">
                  Word Count: <span id="word-count">{wordCount}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Button onClick={handleBackToIntro} variant="outline" className="flex items-center">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleSubmit} className="flex items-center bg-indigo-600 hover:bg-indigo-700">
                  Submit
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
}