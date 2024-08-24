'use client'

import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { BookOpen, Shuffle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

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
    <div className="absolute inset-0 overflow-hidden">
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

export default function ReadingPracticeIntro() {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [randomQuestionCount, setRandomQuestionCount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const questionTypes = [
    "Matching Features",
    "Table Completion",
    "Flow Chart Completion",
    "Identifying Information",
    "Matching Headings",
    "Matching Sentence Endings",
    "Multiple Choice",
    "Sentence Completion",
    "Summary Completion",
  ];

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleStartPractice = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const questionCount = selectedTypes.length > 0 ? 1 : 0;
      window.location.href = `/ReadingPractice?selectedTypes=${encodeURIComponent(JSON.stringify(selectedTypes))}&questionCount=${questionCount}`;
    }, 0);
  };

  const handleRandomQuestions = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const count = parseInt(randomQuestionCount);
      if (isNaN(count) || count < 1 || count > 10) return;

      const shuffled = [...questionTypes].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, count);
      window.location.href = `/ReadingPractice?selectedTypes=${encodeURIComponent(JSON.stringify(selected))}&questionCount=${count}`;
    }, 0);
  };

  const handleRandomQuestionCountChange = (e) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 10)) {
      setRandomQuestionCount(value);
    }
  };

  const isRandomQuestionCountValid = randomQuestionCount !== '' && parseInt(randomQuestionCount) >= 1 && parseInt(randomQuestionCount) <= 10;

  const headerAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.molasses,
  });

  const cardAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.molasses,
  });

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <div className="w-full max-w-4xl space-y-12 relative z-10">
        <animated.div style={headerAnimation} className="text-center">
          <BookOpen className="mx-auto h-16 w-16 text-indigo-600" />
          <h1 className="mt-6 text-4xl font-extrabold text-white">Answer the following questions to improve your reading skills</h1>
          <p className="mt-2 text-xl text-gray-200">
            Customize your practice session by selecting specific question types or generate a random set.
          </p>
        </animated.div>

        <animated.div style={cardAnimation}>
          <Card className="bg-white bg-opacity-80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Select question types</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questionTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox 
                    id={type} 
                    checked={selectedTypes.includes(type)}
                    onCheckedChange={() => handleTypeToggle(type)}
                  />
                  <Label htmlFor={type} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {type}
                  </Label>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button 
                onClick={handleStartPractice} 
                disabled={selectedTypes.length === 0 || isLoading}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {isLoading ? 'Loading...' : 'Start Practice'}
              </Button>
            </CardFooter>
          </Card>
        </animated.div>

        <animated.div style={cardAnimation}>
          <Card className="bg-white bg-opacity-80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Random Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Generate a set of random questions for your practice. Enter a number between 1 and 10 to specify how many questions you'd like to practice. The questions will be randomly selected from all available types.
              </p>
              <div className="flex items-center space-x-4">
                <Label htmlFor="randomCount" className="whitespace-nowrap">Number of questions:</Label>
                <Input
                  id="randomCount"
                  type="number"
                  min="1"
                  max="10"
                  value={randomQuestionCount}
                  onChange={handleRandomQuestionCountChange}
                  className="w-20"
                />
                <Button 
                  onClick={handleRandomQuestions}
                  disabled={!isRandomQuestionCountValid || isLoading}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Shuffle className="mr-2 h-4 w-4" />
                  Generate Random Questions
                </Button>
              </div>
            </CardContent>
          </Card>
        </animated.div>
      </div>
    </div>
  );
}