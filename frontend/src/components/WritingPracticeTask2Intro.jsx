import React, { useState } from 'react';
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const IELTSWritingPractice = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const navigate = useNavigate();

  const handleTopicChange = (value) => {
    setSelectedTopic(value);
  };

  const handleStartPractice = async () => {
    try {
      const response = await fetch(`http://localhost:3000/writingTask2Questions/selected-question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categories: [selectedTopic] }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate(`/WritingPracticeTask2`, { state: { prompt: data } });
      } else {
        console.error('Error fetching prompt:', data.error);
      }
    } catch (error) {
      console.error('Error fetching prompt:', error);
    }
  };

  const handleRandomPractice = async () => {
    try {
      const response = await fetch(`http://localhost:3000/writingTask2Questions/random-question`);
      const data = await response.json();
      if (response.ok) {
        navigate(`/WritingPracticeTask2`, { state: { prompt: data } });
      } else {
        console.error('Error fetching prompt:', data.error);
      }
    } catch (error) {
      console.error('Error fetching random prompt:', error);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Task 2 Writing Practice</h1>
          <p className="text-muted-foreground">
            In this practice session, you will be presented with a variety of IELTS Task 2 writing prompts. Select a
            topic category, then click "Start Practice" to begin writing your response.
          </p>
        </div>
        <Separator className="my-8" />
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Select a Topic Category</h2>
          <RadioGroup value={selectedTopic} onValueChange={handleTopicChange}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Public Transport",
                "Employment",
                "Youth Crime",
                "Celebrity",
                "Society",
                "Government Spending",
                "Development",
                "Globalisation",
                "Criminal Justice",
                "Technology",
                "Environment",
                "Education",
                "Health",
              ].map((topic) => (
                <div key={topic} className="flex items-center space-x-2">
                  <RadioGroupItem id={topic} value={topic} />
                  <Label htmlFor={topic}>
                    {topic}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          <Button
            onClick={handleStartPractice}
            className={`inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${selectedTopic ? '' : 'pointer-events-none opacity-50'}`}
          >
            Start Practice
          </Button>
          <Button onClick={handleRandomPractice} variant="secondary">
            Practice Random Question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IELTSWritingPractice;
