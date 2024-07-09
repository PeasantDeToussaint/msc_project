import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

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
        description: "You must choose at least one topics from each section.",
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
    <div className="w-full max-w-3xl mx-auto py-12 px-4 md:px-6">
      <Toaster />
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">IELTS Speaking Practice</h1>

      </div>
      <div className="space-y-6">
        <div className="space-y-4">
          <p className="text-muted-foreground">
            The IELTS Speaking Exam is a 11-14 minute face-to-face interview with a certified examiner. It is divided into three parts:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Part 1: Introduction and interview (4-5 minutes)</li>
            <li>Part 2: Cue Card/Candidate Task Card (3-4 minutes)</li>
            <li>Part 3: Discussion (4-5 minutes)</li>
          </ul>
          <p className="text-muted-foreground mt-4">
            The Speaking test assesses whether candidates can communicate effectively in English. The assessment takes into account Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, and Pronunciation.
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex justify-center space-x-4">
            <Button className="w-full sm:w-auto" onClick={handleRandomTopics}>Practice Random Topics</Button>
          </div>
          <div className="flex justify-center space-x-4">
            <h2 className="text-xl font-bold">Or Select Topics to Practice</h2>
          </div>
          {Object.keys(topics).map((part) => (
            <div key={part} className="space-y-4">
              <h3 className="text-lg font-bold">Part {part.slice(-1)}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {topics[part].map((topic, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${part}-${index}`}
                      checked={selectedTopics[part].includes(topic)}
                      onCheckedChange={(checked) => handleCheckboxChange(part, topic, checked)}
                    />
                    <Label htmlFor={`${part}-${index}`}>{topic}</Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-4">
          <Button className="w-full sm:w-auto" onClick={handleStartPractice}>Start Practice</Button>
        </div>
      </div>
    </div>
  );
}
