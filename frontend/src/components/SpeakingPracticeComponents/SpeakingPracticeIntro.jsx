import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FloatingObject = ({ delay, style }) => {
  const props = useSpring({
    loop: true,
    to: [
      { transform: 'translate3d(0,20px,0)' },
      { transform: 'translate3d(0,-20px,0)' },
    ],
    from: { transform: 'translate3d(0,0px,0)' },
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

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

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

export default function TopicSelection() {
  const [selectedTopics, setSelectedTopics] = useState({ part1: [], part2: [], part3: [] });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCheckboxChange = (part, topic, checked) => {
    setSelectedTopics((prev) => {
      const newSelected = { ...prev };
      if (checked) {
        newSelected[part].push(topic);
      } else {
        newSelected[part] = newSelected[part].filter((t) => t !== topic);
      }
      return newSelected;
    });
  };

  const handleStartPractice = () => {
    if (selectedTopics.part1.length < 1 || selectedTopics.part2.length < 1 || selectedTopics.part3.length < 1) {
      toast({
        title: "Selection Error",
        description: "You must choose at least one topic from each section.",
        status: "error"
      });
    } else {
      navigate('/SpeakingPractice', {
        state: { selectedTopics }
      });
    }
  };

  const handleRandomTopics = () => {
    navigate('/SpeakingPracticeRandom');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <Toaster />
      <motion.div 
        className="max-w-3xl mx-auto space-y-8 relative z-10"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-indigo-800">Speaking Practice</h1>
          </div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>IELTS Speaking Exam Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                The IELTS Speaking Exam is a 11-14 minute face-to-face interview with a certified examiner. It is divided into three parts:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Part 1: Introduction and interview (4-5 minutes)</li>
                <li>Part 2: Cue Card/Candidate Task Card (3-4 minutes)</li>
                <li>Part 3: Discussion (4-5 minutes)</li>
              </ul>
              <p className="text-muted-foreground">
                The Speaking test assesses whether candidates can communicate effectively in English. The assessment takes into account Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, and Pronunciation.
              </p>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <div className="flex justify-center space-x-4 mb-8">
              <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700" onClick={handleRandomTopics}>Practice Random Topics</Button>
            </div>
            <h2 className="text-xl font-bold text-center text-indigo-700 mb-4">Or Select Topics to Practice</h2>
            {Object.keys(topics).map((part) => (
              <Card key={part} className="mb-6">
                <CardHeader>
                  <CardTitle>Part {part.slice(-1)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {topics[part].map((topic, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${part}-${index}`}
                          checked={selectedTopics[part].includes(topic)}
                          onCheckedChange={(checked) => handleCheckboxChange(part, topic, checked)}
                        />
                        <Label htmlFor={`${part}-${index}`} className="text-sm">{topic}</Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="flex justify-center space-x-4">
              <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700" onClick={handleStartPractice}>Start Practice</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}