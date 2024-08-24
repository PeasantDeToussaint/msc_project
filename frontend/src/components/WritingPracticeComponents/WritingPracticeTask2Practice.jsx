import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSpring, animated, config } from 'react-spring';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Clock, Send } from 'lucide-react';

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
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-20" />
      <FloatingObject delay={0} style={{ top: '10%', left: '10%' }} />
      <FloatingObject delay={500} style={{ top: '20%', right: '20%' }} />
      <FloatingObject delay={1000} style={{ bottom: '15%', left: '30%' }} />
      <FloatingObject delay={1500} style={{ bottom: '25%', right: '15%' }} />
    </div>
  );
};

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
    if (promptData) {
      setPrompt(promptData.question);
      setCategory(promptData.category);
      setTimeLimit(promptData.time_limit);
    }
  }, [promptData]);

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

  const handleResponseChange = (event) => {
    const text = event.target.value;
    setResponse(text);
    setWordCount(text.split(/\s+/).filter(word => word.length > 0).length);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSubmitted) return;
    setIsSubmitted(true);

    toast({ description: "Response submitted!" });

    navigate('/WritingPracticeTask2Feedback', {
      state: {
        prompt: prompt,
        response: response,
      },
    });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const contentAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.molasses,
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <Toaster />
      <animated.div style={contentAnimation} className="max-w-4xl mx-auto space-y-8 relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Task 2 Practice</h1>
            <p className="text-sm text-gray-600">Write a 250-word response.</p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-md mb-8">
            <p className="text-sm text-indigo-900 font-medium mb-2">
              Topic: {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </p>
            <p className="text-sm text-indigo-900 font-medium mb-2">
              Question: {prompt || "Loading..."}
            </p>
            <p className="text-sm text-indigo-900 font-medium">
              Time Limit: {timeLimit} minutes
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <Textarea
                value={response}
                onChange={handleResponseChange}
                placeholder="Start writing your response here..."
                className="w-full h-[400px] text-sm p-4 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                disabled={isTimeUp || isSubmitted}
              />
              <div className="absolute top-4 right-4 flex items-center gap-2 text-sm text-gray-500 bg-white px-2 py-1 rounded-md">
                <Clock className="w-4 h-4" />
                <span id="timer">{formatTime(timer)}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span id="word-count">{wordCount}</span> words
              </div>
              <Button 
                type="submit" 
                disabled={isTimeUp || isSubmitted}
                className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit
              </Button>
            </div>
          </form>
        </div>
      </animated.div>
    </div>
  );
};

export default WritingPracticeTask2;