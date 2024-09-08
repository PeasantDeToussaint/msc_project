'use client'

import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Award, Book, PlusCircle, Brain, Sparkles, CheckCircle2 } from 'lucide-react';

const AnimatedCard = animated(Card);

const missions = [
  { id: 1, name: "Rote. Rote. Rote.", description: "Abracadabra! Learn 1000 new words.", target: 1000, type: "vocabulary", icon: Book },
  { id: 2, name: "Enchantment", description: "Write 50 essays.", target: 50, type: "writing", icon: PlusCircle },
  { id: 3, name: "Hush! Listen!", description: "Do 100 listening exercises.", target: 100, type: "listening", icon: Brain },
  { id: 4, name: "Cast the spell", description: "Achieve 7 on speaking practices.", target: 24, type: "speaking", icon: Sparkles },
  { id: 5, name: "Grammar Nazi", description: "Achieve 100% on 10 vocab quizzes.", target: 10, type: "grammar", icon: CheckCircle2 },
];

export default function MissionsCard({ cardAnimation }) {
  const [currentMission, setCurrentMission] = useState({
    id: 1,
    name: "Wizard's Challenge",
    description: "Learn 1000 new words and cast your spell of knowledge.",
    target: 1000,
    type: "vocabulary",
    icon: Book
  });
  const [missionProgress, setMissionProgress] = useState(0);
  const [quests, setQuests] = useState([
    { id: 1, name: "Vocabulary Virtuoso", description: "Learn 1000 new words", icon: Book, target: 1000, progress: 0, type: "vocabulary" },
    { id: 2, name: "Essay Extraordinaire", description: "Write 50 practice essays", icon: PlusCircle, target: 50, progress: 0,
    type: "writing" },
    { id: 3, name: "Listening Leopard", description: "Complete 100 listening exercises", icon: Brain, target: 100, progress: 0, type: "listening" },
    { id: 4, name: "Speaking Sorcerer", description: "Practice 24 speaking questions", icon: Sparkles, target: 24, progress: 0, type: "speaking" },
    { id: 5, name: "Grammar Guru", description: "Achieve 100% on 10 grammar quizzes", icon: CheckCircle2, target: 10, progress: 0, type: "grammar" },
  ]);

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

  const isQuestAchieved = (quest) => quest.progress >= quest.target;

  return (
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
  );
}