import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated, config } from 'react-spring';
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BarChart2, Shuffle } from 'lucide-react';

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

const chartTypes = [
  { value: "line", label: "Line Graph" },
  { value: "bar", label: "Bar Chart" },
  { value: "pie", label: "Pie Chart" },
  { value: "table", label: "Table" },
  { value: "process", label: "Process Diagram" },
  { value: "map", label: "Map" },
  { value: "mixed", label: "Mixed Chart" },
];

const IELTSTask1Practice = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const navigate = useNavigate();

  const handleTopicChange = (value) => {
    setSelectedTopic(value);
  };

  const handleStartPractice = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/writingTask1Questions/selected-question`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ categories: [selectedTopic] }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        navigate(`/WritingPracticeTask1`, { state: { prompt: data } });
      } else {
        console.error("Error fetching prompt:", data.error);
      }
    } catch (error) {
      console.error("Error fetching prompt:", error);
    }
  };

  const handleRandomPractice = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/writingTask1Questions/random-question`
      );
      const data = await response.json();
      if (response.ok) {
        navigate(`/WritingPracticeTask1`, { state: { prompt: data } });
      } else {
        console.error("Error fetching prompt:", data.error);
      }
    } catch (error) {
      console.error("Error fetching random prompt:", error);
    }
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
      <animated.div style={contentAnimation} className="max-w-3xl mx-auto space-y-8 relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">Task 1 Writing Practice</h1>
              <p className="text-gray-600">
                In this practice session, you will be presented with a variety of
                IELTS Task 1 writing prompts. Select a topic category, then click
                "Start Practice" to begin writing your response.
              </p>
            </div>
            <Separator className="my-8" />
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Select a Topic Category</h2>
              <RadioGroup value={selectedTopic} onValueChange={handleTopicChange}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {chartTypes.map((topic) => (
                    <div key={topic.value} className="flex items-center space-x-2">
                      <RadioGroupItem id={topic.value} value={topic.value} />
                      <Label htmlFor={topic.value} className="text-gray-700">{topic.label}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
            <div className="flex justify-center mt-8 space-x-4">
              <Button
                onClick={handleStartPractice}
                className={`inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  selectedTopic ? "" : "pointer-events-none opacity-50"
                }`}
              >
                <BarChart2 className="w-5 h-5 mr-2" />
                Start Practice
              </Button>
              <Button 
                onClick={handleRandomPractice} 
                variant="outline"
                className="inline-flex items-center justify-center rounded-md border border-indigo-600 px-6 py-3 text-sm font-medium text-indigo-600 shadow transition-colors hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <Shuffle className="w-5 h-5 mr-2" />
                Practice Random Question
              </Button>
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default IELTSTask1Practice;