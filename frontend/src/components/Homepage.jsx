"use client"

import React, { useState, useEffect } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Book, Brain, Calendar as CalendarIcon, CheckCircle2, Sparkles, Target, Award, PlusCircle } from 'lucide-react';

const AnimatedCard = animated(Card);

const CardWrapper = ({ children, width = 'w-full', height = 'h-full' }) => (
  <div className={`${width} ${height} p-2`}>
    {children}
  </div>
);

export default function Component() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reviewItems, setReviewItems] = useState([]);
  const [currentMission, setCurrentMission] = useState({
    id: 1,
    name: "Wizard's Challenge",
    description: "Learn 1000 new words and cast your spell of knowledge.",
    target: 1000,
    type: "vocabulary",
    icon: Book
  });
  const [missionProgress, setMissionProgress] = useState(0);
  const [targetDate, setTargetDate] = useState(null);
  const [daysUntilTarget, setDaysUntilTarget] = useState(null);
  const [essayTitles, setEssayTitles] = useState([
    { id: 1, title: "The impact of technology on education", date: "2023-08-15" },
    { id: 2, title: "Climate change and its effects on agriculture", date: "2023-08-10" },
    { id: 3, title: "The role of social media in modern society", date: "2023-08-05" },
  ]);
  const [ieltsTestDates, setIeltsTestDates] = useState([]);

  const [quests, setQuests] = useState([
    { id: 1, name: "Vocabulary Virtuoso", description: "Learn 1000 new words", icon: Book, target: 1000, progress: 0, type: "vocabulary" },
    { id: 2, name: "Essay Extraordinaire", description: "Write 50 practice essays", icon: PlusCircle, target: 50, progress: 0, type: "writing" },
    { id: 3, name: "Listening Leopard", description: "Complete 100 listening exercises", icon: Brain, target: 100, progress: 0, type: "listening" },
    { id: 4, name: "Speaking Sorcerer", description: "Practice 24 speaking questions", icon: Sparkles, target: 24, progress: 0, type: "speaking" },
    { id: 5, name: "Grammar Guru", description: "Achieve 100% on 10 grammar quizzes", icon: CheckCircle2, target: 10, progress: 0, type: "grammar" },
  ]);

  const missions = [
    { id: 1, name: "Rote. Rote. Rote.", description: "Abracadabra! Learn 1000 new words.", target: 1000, type: "vocabulary", icon: Book },
    { id: 2, name: "Enchantment", description: "Write 50 essays.", target: 50, type: "writing", icon: PlusCircle },
    { id: 3, name: "Hush! Listen!", description: "Do 100 listening exercises.", target: 100, type: "listening", icon: Brain },
    { id: 4, name: "Cast the spell", description: "Achieve 7 on speaking practices.", target: 24, type: "speaking", icon: Sparkles },
    { id: 5, name: "Grammar Nazi", description: "Achieve 100% on 10 vocab quizzes.", target: 10, type: "grammar", icon: CheckCircle2 },
  ];

  const spacedRepetitionItems = [
    { id: 1, type: 'Vocabulary', topic: 'Technology', dueDate: '2024-08-20', strength: 0.7 },
    { id: 2, type: 'Reading', topic: 'Environmental Issues', dueDate: '2024-08-21', strength: 0.5 },
    { id: 3, type: 'Listening', topic: 'Academic Lecture', dueDate: '2024-08-22', strength: 0.8 },
    { id: 4, type: 'Writing', topic: 'Task 2 Essay', dueDate: '2024-08-23', strength: 0.3 },
    { id: 5, type: 'Speaking', topic: 'Part 2 Long Turn', dueDate: '2024-08-24', strength: 0.6 },
  ];

  useEffect(() => {
    const items = spacedRepetitionItems.filter(item => 
      new Date(item.dueDate).toDateString() === selectedDate.toDateString()
    );
    setReviewItems(items);
  }, [selectedDate]);

  useEffect(() => {
    if (targetDate) {
      const today = new Date();
      const diffTime = targetDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysUntilTarget(diffDays);
    }
  }, [targetDate]);

  useEffect(() => {
    const fetchIeltsTestDates = async () => {
      const testDates = [
        new Date(2024, 0, 6),
        new Date(2024, 0, 13),
        new Date(2024, 0, 27),
        new Date(2024, 1, 3),
        new Date(2024, 1, 24),
        new Date(2024, 2, 2),
        new Date(2024, 2, 9),
        new Date(2024, 2, 16),
        new Date(2024, 2, 23),
        new Date(2024, 3, 6),
        new Date(2024, 3, 13),
        new Date(2024, 3, 20),
        new Date(2024, 3, 27),
        new Date(2024, 4, 11),
        new Date(2024, 4, 18),
        new Date(2024, 4, 25),
        new Date(2024, 5, 1),
        new Date(2024, 5, 8),
        new Date(2024, 5, 22),
        new Date(2024, 5, 29),
        new Date(2024, 6, 6),
        new Date(2024, 6, 20),
        new Date(2024, 6, 27),
        new Date(2024, 7, 3),
        new Date(2024, 7, 10),
        new Date(2024, 7, 17),
        new Date(2024, 7, 24),
        new Date(2024, 7, 31),
        new Date(2024, 8, 7),
        new Date(2024, 8, 14),
        new Date(2024, 8, 28),
        new Date(2024, 9, 12),
        new Date(2024, 9, 19),
        new Date(2024, 9, 26),
        new Date(2024, 10, 2),
        new Date(2024, 10, 16),
        new Date(2024, 10, 23),
        new Date(2024, 10, 30),
        new Date(2024, 11, 7),
        new Date(2024, 11, 14),
        new Date(2024, 11, 21),
        new Date(2024, 11, 28),
      ];
      setIeltsTestDates(testDates);
    };

    fetchIeltsTestDates();
  }, []);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: config.gentle,
  });

  const cardAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: config.wobbly,
  });

  const getStrengthColor = (strength) => {
    if (strength > 0.7) return 'bg-green-500';
    if (strength > 0.4) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleMissionChange = (missionId) => {
    const selectedMission = missions.find(mission => mission.id === parseInt(missionId));
    setCurrentMission(selectedMission);
    setMissionProgress(0);
  };

  const handleMissionProgress = () => {
    const newProgress = Math.min(missionProgress + 10, currentMission.target);
    setMissionProgress(newProgress);
    
    setQuests(prevQuests => prevQuests.map(quest => 
      quest.type === currentMission.type 
        ? { ...quest, progress: Math.min(quest.progress + 10, quest.target) } 
        : quest
    ));
  };

  const handleSetTargetDate = (date) => {
    setTargetDate(date);
  };

  const isQuestAchieved = (quest) => quest.progress >= quest.target;

  return (
    <div className="min-h-screen bg-gray-80 text-gray-800 p-4">
      <div className="container mx-auto">
        <animated.div style={fadeIn} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardWrapper width="w-full md:col-span-2 lg:col-span-3">
            <AnimatedCard style={cardAnimation}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center justify-between">
                  <span className="flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    Practice Schedule & Exam Countdown
                  </span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        {targetDate ? 'Change Exam Date' : 'Set Exam Date'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent aria-describedby="set-exam-date-description">
                      <DialogHeader>
                        <DialogTitle>Set Your IELTS Exam Date</DialogTitle>
                      </DialogHeader>
                      <p id="set-exam-date-description" className="sr-only">
                        Select a date for your IELTS exam from the available test dates.
                      </p>
                      <Calendar
                        mode="single"
                        selected={targetDate}
                        onSelect={handleSetTargetDate}
                        initialFocus
                        disabled={(date) => !ieltsTestDates.some(testDate => 
                          testDate.toDateString() === date.toDateString()
                        )}
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        Available test dates are highlighted. Dates are fetched from the official IELTS website.
                      </p>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/3">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                    {targetDate && (
                      <div className="mt-4 text-center">
                        <p className="text-2xl font-bold text-blue-600">{daysUntilTarget} days</p>
                        <p className="text-gray-600">until your IELTS exam</p>
                      </div>
                    )}
                  </div>
                  <div className="w-full md:w-2/3">
                    <h3 className="text-lg font-semibold mb-2">Review Items for {selectedDate.toDateString()}</h3>
                    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                      {reviewItems.length > 0 ? (
                        <div className="space-y-4">
                          {reviewItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-2 rounded-lg bg-white shadow">
                              <div>
                                <h4 className="font-semibold">{item.type}: {item.topic}</h4>
                                <p className="text-sm text-gray-500">Due: {item.dueDate}</p>
                              </div>
                              <div className={`w-3 h-3 rounded-full ${getStrengthColor(item.strength)}`} title={`Memory Strength: ${Math.round(item.strength * 100)}%`} />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-gray-500">No review items for this date.</p>
                      )}
                    </ScrollArea>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>
          </CardWrapper>

          <CardWrapper width="w-full md:col-span-2 lg:col-span-3">
            <AnimatedCard style={cardAnimation}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Missions & Quests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/3">
                    <h3 className="text-lg font-semibold mb-2">Current Mission</h3>
                    <Select onValueChange={handleMissionChange} defaultValue={currentMission.id.toString()}>
                      <SelectTrigger className="w-full mb-2">
                        <SelectValue placeholder="Choose your mission" />
                      </SelectTrigger>
                      <SelectContent>
                        {missions.map((mission) => (
                          <SelectItem key={mission.id} value={mission.id.toString()}>
                            {mission.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Progress value={(missionProgress / currentMission.target) * 100} className="h-2 mb-2" />
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{missionProgress} / {currentMission.target}</span>
                      <Button size="sm" onClick={handleMissionProgress}>Record Progress</Button>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <h3 className="text-lg font-semibold mb-2">Quest Achievements</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                      {quests.map((quest) => (
                        <TooltipProvider key={quest.id}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                className={`w-full h-full aspect-square flex flex-col items-center justify-center p-1 ${
                                  isQuestAchieved(quest) ? 'bg-blue-100 border-blue-500' : 'bg-gray-100 border-gray-300'
                                }`}
                              >
                                <quest.icon className={`w-4 h-4 mb-1 ${isQuestAchieved(quest) ? 'text-blue-500' : 'text-gray-500'}`} />
                                <span className="text-[10px] text-center font-medium">{quest.name}</span>
                                <Progress 
                                  value={(quest.progress / quest.target) * 100} 
                                  className="w-full h-1 mt-1" 
                                />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{quest.description}</p>
                              <p className="text-sm text-gray-500 mt-1">Progress: {quest.progress}/{quest.target}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>
          </CardWrapper>

          <CardWrapper width="w-full md:col-span-2 lg:col-span-3">
            <AnimatedCard style={cardAnimation}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center justify-between">
                  <span className="flex items-center">
                    <Book className="w-5 h-5 mr-2" />
                    Past Essay Topics
                  </span>
                  <Button size="sm">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add New Essay
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                  {essayTitles.map((essay) => (
                    <div key={essay.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                      <span className="font-medium">{essay.title}</span>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-4">{essay.date}</span>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </AnimatedCard>
          </CardWrapper>
        </animated.div>
      </div>
    </div>
  );
}