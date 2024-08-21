import React, { useState, useEffect } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Book, Brain, Calendar as CalendarIcon, CheckCircle2, Clock, Sparkles, Target, Award, PlusCircle, User, Coffee, Zap, Headphones, Pen, Globe, Rocket, Star, Sun, Moon } from 'lucide-react';

const AnimatedCard = animated(Card);

const CardWrapper = ({ children, width = 'w-full', height = 'h-full' }) => (
  <div className={`${width} ${height} p-2`}>
    {children}
  </div>
);

const HeatMap = ({ data }) => {
  const today = new Date();
  const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
  
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const getMonthData = () => {
    const months = [];
    let currentDate = new Date(oneYearAgo);
    
    while (currentDate <= today) {
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      
      const days = [];
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        if (date <= today) {
          const dateString = date.toISOString().split('T')[0];
          days.push({ date: dateString, practiced: data.includes(dateString) });
        }
      }
      
      months.push({ name: monthNames[month], days });
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    return months;
  };

  const months = getMonthData();

  return (
    <div className="flex flex-wrap gap-4">
      {months.map((month, monthIndex) => (
        <div key={monthIndex} className="flex flex-col items-center">
          <div className="grid grid-cols-7 gap-1">
            {month.days.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`w-3 h-3 rounded-sm ${day.practiced ? 'bg-blue-500' : 'bg-gray-200'}`}
                title={`${day.date}: ${day.practiced ? 'Practiced' : 'No practice'}`}
              />
            ))}
          </div>
          <span className="text-xs mt-1 text-gray-500">{month.name}</span>
        </div>
      ))}
    </div>
  );
};

export default function Component() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reviewItems, setReviewItems] = useState([]);
  const [practiceDates, setPracticeDates] = useState([]);
  const [currentMission, setCurrentMission] = useState({
    id: 1,
    name: "Wizard's Challenge",
    description: "Abracadabra! Learn 1000 new words and cast your spell of knowledge.",
    target: 1000,
    type: "vocabulary",
    icon: Book
  });
  const [missionProgress, setMissionProgress] = useState(0);
  const [targetDate, setTargetDate] = useState(null);
  const [daysUntilTarget, setDaysUntilTarget] = useState(null);
  const [userTitle, setUserTitle] = useState("Novice Scholar");
  const [earnedTitles, setEarnedTitles] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState({ id: 1, src: "/placeholder.svg?height=40&width=40", alt: "Avatar 1" });
  const [essayTitles, setEssayTitles] = useState([
    { id: 1, title: "The impact of technology on education", date: "2023-08-15" },
    { id: 2, title: "Climate change and its effects on agriculture", date: "2023-08-10" },
    { id: 3, title: "The role of social media in modern society", date: "2023-08-05" },
  ]);

  const [quests, setQuests] = useState([
    { id: 1, name: "Vocabulary Virtuoso", description: "Learn 1000 new words", icon: Book, target: 1000, progress: 0, type: "vocabulary" },
    { id: 2, name: "Essay Extraordinaire", description: "Write 50 practice essays", icon: Pen, target: 50, progress: 0, type: "writing" },
    { id: 3, name: "Listening Leopard", description: "Complete 100 listening exercises", icon: Headphones, target: 100, progress: 0, type: "listening" },
    { id: 4, name: "Speaking Sorcerer", description: "Practice speaking for 24 hours total", icon: Sparkles, target: 24, progress: 0, type: "speaking" },
    { id: 5, name: "Grammar Guru", description: "Achieve 100% on 10 grammar quizzes", icon: CheckCircle2, target: 10, progress: 0, type: "grammar" },
    { id: 6, name: "Idiom Illusionist", description: "Master 100 English idioms", icon: Zap, target: 100, progress: 0, type: "idioms" },
    { id: 7, name: "Pronunciation Prodigy", description: "Perfect pronunciation of 50 tongue twisters", icon: Brain, target: 50, progress: 0, type: "pronunciation" },
    { id: 8, name: "Reading Rocket", description: "Read 1000 pages of English text", icon: Rocket, target: 1000, progress: 0, type: "reading" },
    { id: 9, name: "Night Owl", description: "Study for 50 hours between 10 PM and 5 AM", icon: Moon, target: 50, progress: 0, type: "study" },
    { id: 10, name: "Global Gossiper", description: "Have conversations with people from 10 different countries", icon: Globe, target: 10, progress: 0, type: "conversation" },
  ]);

  const missions = [
    { id: 1, name: "Wizard's Challenge", description: "Abracadabra! Learn 1000 new words and cast your spell of knowledge.", target: 1000, type: "vocabulary", icon: Book },
    { id: 2, name: "Enchantment", description: "Write 50 essays and enchant the world with your words.", target: 50, type: "writing", icon: Pen },
    { id: 3, name: "Hush! Listen now!", description: "Pounce on 100 listening exercises and sharpen your ears.", target: 100, type: "listening", icon: Headphones },
    { id: 4, name: "Cast the spell", description: "Speak for 24 hours and mesmerize everyone with your eloquence.", target: 24, type: "speaking", icon: Sparkles },
    { id: 5, name: "Grammar Nazi", description: "Achieve 100% on 10 grammar quizzes and become the ultimate grammar ninja.", target: 10, type: "grammar", icon: CheckCircle2 },
    { id: 6, name: "Thus spoke Zarathustra", description: "Master 100 idioms and leave everyone scratching their heads.", target: 100, type: "idioms", icon: Zap },
    { id: 7, name: "Perfect articulator", description: "Perfect 50 tongue twisters and show off your linguistic gymnastics.", target: 50, type: "pronunciation", icon: Brain },
    { id: 8, name: "Read the stars", description: "Blast through 1000 pages of English text and reach for the stars.", target: 1000, type: "reading", icon: Rocket },
    { id: 9, name: "The Night Owl", description: "Study for 50 hours between 10 PM and 5 AM and become the master of the night.", target: 50, type: "study", icon: Moon },
    { id: 10, name: "The Global Gossiper's Gala", description: "Have conversations with people from 10 different countries and become the ultimate social butterfly.", target: 10, type: "conversation", icon: Globe },
  ];

  const spacedRepetitionItems = [
    { id: 1, type: 'Vocabulary', topic: 'Technology', dueDate: '2024-08-20', strength: 0.7 },
    { id: 2, type: 'Reading', topic: 'Environmental Issues', dueDate: '2024-08-21', strength: 0.5 },
    { id: 3, type: 'Listening', topic: 'Academic Lecture', dueDate: '2024-08-22', strength: 0.8 },
    { id: 4, type: 'Writing', topic: 'Task 2 Essay', dueDate: '2024-08-23', strength: 0.3 },
    { id: 5, type: 'Speaking', topic: 'Part 2 Long Turn', dueDate: '2024-08-24', strength: 0.6 },
  ];

  const avatars = [
    { id: 1, src: "/placeholder.svg?height=40&width=40", alt: "Avatar 1" },
    { id: 2, src: "/placeholder.svg?height=40&width=40", alt: "Avatar 2" },
    { id: 3, src: "/placeholder.svg?height=40&width=40", alt: "Avatar 3" },
    { id: 4, src: "/placeholder.svg?height=40&width=40", alt: "Avatar 4" },
  ];

  useEffect(() => {
    const items = spacedRepetitionItems.filter(item => 
      new Date(item.dueDate).toDateString() === selectedDate.toDateString()
    );
    setReviewItems(items);

    const simulatePracticeDates = () => {
      const dates = [];
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      
      for (let d = new Date(oneYearAgo); d <= new Date(); d.setDate(d.getDate() + 1)) {
        if (Math.random() > 0.7) {
          dates.push(d.toISOString().split('T')[0]);
        }
      }
      return dates;
    };

    setPracticeDates(simulatePracticeDates());
  }, [selectedDate]);

  useEffect(() => {
    if (targetDate) {
      const today = new Date();
      const diffTime = targetDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysUntilTarget(diffDays);
    }
  }, [targetDate]);

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

    if (newProgress === currentMission.target && !earnedTitles.includes(currentMission.name)) {
      setEarnedTitles([...earnedTitles, currentMission.name]);
    }
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
                <CardTitle className="text-2xl font-bold">Wellcome! User</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Select value={selectedAvatar.id.toString()} onValueChange={(value) => setSelectedAvatar(avatars.find(avatar => avatar.id.toString() === value))}>
                      <SelectTrigger className="w-[80px]">
                        <SelectValue>
                        <Avatar>
                          <AvatarImage src={selectedAvatar.src} alt={selectedAvatar.alt} />
                          <AvatarFallback><User /></AvatarFallback>
                         </Avatar> 
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {avatars.map((avatar) => (
                          <SelectItem key={avatar.id} value={avatar.id.toString()}>
                            <Avatar>
                              <AvatarImage src={avatar.src} alt={avatar.alt} />
                              <AvatarFallback><User /></AvatarFallback>
                            </Avatar>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">IELTS Aspirant</h2>
                      <Select value={userTitle} onValueChange={setUserTitle}>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select your title" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Novice Scholar">Novice Scholar</SelectItem>
                          {earnedTitles.map((title) => (
                            <SelectItem key={title} value={title}>{title}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant="outline" className="text-blue-500 border-blue-500">
                      <Brain className="w-4 h-4 mr-2" />
                      Spaced Repetition
                    </Badge>
                    <Badge variant="outline" className="text-green-500 border-green-500">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      5 Topics Mastered
                    </Badge>
                    <Badge variant="outline" className="text-amber-500 border-amber-500">
                      <Clock className="w-4 h-4 mr-2" />
                      Next Review: 2h
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>
          </CardWrapper>

          <CardWrapper>
            <AnimatedCard style={cardAnimation}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Exam Countdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                {targetDate ? (
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">{daysUntilTarget} days</p>
                    <p className="text-gray-600">until your IELTS exam</p>
                  </div>
                ) : (
                  <p className="text-center text-gray-600">Set your IELTS exam date</p>
                )}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full mt-4">
                      {targetDate ? 'Change Exam Date' : 'Set Exam Date'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Set Your IELTS Exam Date</DialogTitle>
                    </DialogHeader>
                    <Calendar
                      mode="single"
                      selected={targetDate}
                      onSelect={handleSetTargetDate}
                      initialFocus
                    />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </AnimatedCard>
          </CardWrapper>

          <CardWrapper width="w-full md:col-span-1 lg:col-span-2">
            <AnimatedCard style={cardAnimation}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Current Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select onValueChange={handleMissionChange} defaultValue={currentMission.id.toString()}>
                  <SelectTrigger className="w-full mb-4">
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
                <h3 className="text-lg font-semibold">{currentMission.name}</h3>
                <p className="text-gray-600 mb-2">{currentMission.description}</p>
                <Progress value={(missionProgress / currentMission.target) * 100} className="h-2 mb-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{missionProgress} / {currentMission.target}</span>
                  <Button onClick={handleMissionProgress}>Record Progress</Button>
                </div>
              </CardContent>
            </AnimatedCard>
          </CardWrapper>

          <CardWrapper width="w-full md:col-span-2 lg:col-span-3">
            <AnimatedCard style={cardAnimation}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  Practice Schedule
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
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Practice History</h3>
                  <ScrollArea className="h-[200px] w-full">
                    <HeatMap data={practiceDates} />
                  </ScrollArea>
                </div>
              </CardContent>
            </AnimatedCard>
          </CardWrapper>

          <CardWrapper width="w-full md:col-span-2 lg:col-span-3">
            <AnimatedCard style={cardAnimation}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  IELTS Quest Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {quests.map((quest) => (
                    <TooltipProvider key={quest.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full h-full aspect-square flex flex-col items-center justify-center p-2 ${
                              isQuestAchieved(quest) ? 'bg-blue-100 border-blue-500' : 'bg-gray-100 border-gray-300'
                            }`}
                          >
                            <quest.icon className={`w-8 h-8 mb-2 ${isQuestAchieved(quest) ? 'text-blue-500' : 'text-gray-500'}`} />
                            <span className="text-xs text-center font-medium">{quest.name}</span>
                            <Progress 
                              value={(quest.progress / quest.target) * 100} 
                              className="w-full h-1 mt-2" 
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
              </CardContent>
            </AnimatedCard>
          </CardWrapper>

          <CardWrapper width="w-full md:col-span-2 lg:col-span-3">
            <AnimatedCard style={cardAnimation}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Practice Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="reading" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="reading">Reading</TabsTrigger>
                    <TabsTrigger value="writing">Writing</TabsTrigger>
                    <TabsTrigger value="listening">Listening</TabsTrigger>
                    <TabsTrigger value="speaking">Speaking</TabsTrigger>
                  </TabsList>
                  <TabsContent value="reading" className="mt-4">
                    <h3 className="font-semibold mb-2">Reading Practice</h3>
                    <p>Enhance your reading skills with our curated passages and comprehension questions.</p>
                    <Button className="mt-4">Start Reading Exercise</Button>
                  </TabsContent>
                  <TabsContent value="writing" className="mt-4">
                    <h3 className="font-semibold mb-2">Writing Practice</h3>
                    <p>Improve your writing skills with guided essay topics and real-time feedback.</p>
                    <Button className="mt-4">Begin Writing Task</Button>
                  </TabsContent>
                  <TabsContent value="listening" className="mt-4">
                    <h3 className="font-semibold mb-2">Listening Practice</h3>
                    <p>Sharpen your listening skills with diverse audio clips and targeted questions.</p>
                    <Button className="mt-4">Start Listening Test</Button>
                  </TabsContent>
                  <TabsContent value="speaking" className="mt-4">
                    <h3 className="font-semibold mb-2">Speaking Practice</h3>
                    <p>Boost your speaking confidence with interactive exercises and pronunciation guides.</p>
                    <Button className="mt-4">Begin Speaking Session</Button>
                  </TabsContent>
                </Tabs>
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