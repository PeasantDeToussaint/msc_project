'use client'

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Headphones, PenTool, Mic, BookMarked, Plus, X, Calendar as CalendarIcon, CheckCircle } from 'lucide-react';
import { format, addDays, differenceInDays, isBefore, isToday, parseISO } from 'date-fns';

const skillTypes = {
  reading: { name: "Reading", icon: BookOpen, color: "text-blue-500" },
  listening: { name: "Listening", icon: Headphones, color: "text-green-500" },
  writing: { name: "Writing", icon: PenTool, color: "text-yellow-500" },
  speaking: { name: "Speaking", icon: Mic, color: "text-purple-500" },
  vocabulary: { name: "Vocabulary", icon: BookMarked, color: "text-red-500" }
};

export default function InteractiveSchedulePlanner() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [practicePlan, setPracticePlan] = useState({});
  const [completedItems, setCompletedItems] = useState({});
  const [targetDate, setTargetDate] = useState(() => {
    const savedDate = localStorage.getItem('ieltsTargetDate');
    return savedDate ? parseISO(savedDate) : addDays(new Date(), 30);
  });
  const [newItemType, setNewItemType] = useState('reading');
  const [newItemTopic, setNewItemTopic] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('calendar');

  useEffect(() => {
    const savedPlan = localStorage.getItem('ieltsPracticePlan');
    if (savedPlan) {
      setPracticePlan(JSON.parse(savedPlan));
    }

    const savedCompletedItems = localStorage.getItem('completedItems');
    if (savedCompletedItems) {
      setCompletedItems(JSON.parse(savedCompletedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ieltsTargetDate', targetDate.toISOString());
  }, [targetDate]);

  const addPracticeItem = () => {
    if (newItemTopic) {
      const dateKey = format(selectedDate, 'yyyy-MM-dd');
      const newPlan = {
        ...practicePlan,
        [dateKey]: [
          ...(practicePlan[dateKey] || []),
          { type: newItemType, topic: newItemTopic, description: newItemDescription }
        ]
      };
      setPracticePlan(newPlan);
      localStorage.setItem('ieltsPracticePlan', JSON.stringify(newPlan));
      setNewItemTopic('');
      setNewItemDescription('');
      setShowAddDialog(false);
    }
  };

  const removePracticeItem = (date, index) => {
    const newPlan = { ...practicePlan };
    newPlan[date].splice(index, 1);
    if (newPlan[date].length === 0) {
      delete newPlan[date];
    }
    setPracticePlan(newPlan);
    localStorage.setItem('ieltsPracticePlan', JSON.stringify(newPlan));
  };

  const toggleItemCompletion = (date, index) => {
    setCompletedItems(prev => {
      const key = `${date}_${index}`;
      const newCompletedItems = { ...prev, [key]: !prev[key] };
      localStorage.setItem('completedItems', JSON.stringify(newCompletedItems));
      return newCompletedItems;
    });
  };

  const getProgressPercentage = () => {
    const totalItems = Object.values(practicePlan).flat().length;
    const completedCount = Object.values(completedItems).filter(Boolean).length;
    return totalItems > 0 ? (completedCount / totalItems) * 100 : 0;
  };

  const renderPracticeItems = (items, date) => (
    <div className="space-y-4">
      {items.map((item, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {React.createElement(skillTypes[item.type].icon, { className: `w-5 h-5 ${skillTypes[item.type].color}` })}
              <span className="font-semibold">{item.topic}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={completedItems[`${date}_${index}`] ? "default" : "outline"}
                size="sm"
                onClick={() => toggleItemCompletion(date, index)}
              >
                {completedItems[`${date}_${index}`] ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Completed
                  </>
                ) : 'Mark Complete'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removePracticeItem(date, index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {item.description && (
            <p className="mt-2 text-sm text-gray-600">{item.description}</p>
          )}
        </Card>
      ))}
    </div>
  );

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Planner</CardTitle>
        <CardDescription>
          Make a backup plan for your backup plan. - Sun Tzu
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calendar" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <TabsContent value="calendar" className="mt-6">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-1/2">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  modifiers={{
                    booked: (date) => practicePlan[format(date, 'yyyy-MM-dd')] !== undefined,
                    completed: (date) => {
                      const dateKey = format(date, 'yyyy-MM-dd');
                      return practicePlan[dateKey]?.every((_, index) => 
                        completedItems[`${dateKey}_${index}`]
                      );
                    }
                  }}
                  modifiersStyles={{
                    booked: { backgroundColor: '#e0f2fe' },
                    completed: { backgroundColor: '#bbf7d0' }
                  }}
                />
                <div className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="targetDate">Target Test Date:</Label>
                    <Input
                      id="targetDate"
                      type="date"
                      value={format(targetDate, 'yyyy-MM-dd')}
                      onChange={(e) => setTargetDate(parseISO(e.target.value))}
                      min={format(addDays(new Date(), 1), 'yyyy-MM-dd')}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      <CalendarIcon className="inline-block w-5 h-5 mr-2" />
                      {differenceInDays(targetDate, new Date())} days until target date
                    </p>
                    <div className="mt-2">
                      <Progress value={getProgressPercentage()} className="w-full" />
                      <p className="text-sm text-gray-600 mt-1">
                        {Math.round(getProgressPercentage())}% of planned items completed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">
                    Practice Items for {format(selectedDate, 'MMMM d, yyyy')}
                  </h3>
                  <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" /> Add Item
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add Practice Item</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="itemType" className="text-right">
                            Type
                          </Label>
                          <Select value={newItemType} onValueChange={setNewItemType}>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select a skill type" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(skillTypes).map(([key, { name }]) => (
                                <SelectItem key={key} value={key}>{name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="itemTopic" className="text-right">
                            Topic
                          </Label>
                          <Input
                            id="itemTopic"
                            value={newItemTopic}
                            onChange={(e) => setNewItemTopic(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="itemDescription" className="text-right">
                            Description
                          </Label>
                          <Textarea
                            id="itemDescription"
                            value={newItemDescription}
                            onChange={(e) => setNewItemDescription(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <Button onClick={addPracticeItem}>Add Item</Button>
                    </DialogContent>
                  </Dialog>
                </div>
                <ScrollArea className="h-[500px] w-full pr-4">
                  {practicePlan[format(selectedDate, 'yyyy-MM-dd')] ? (
                    renderPracticeItems(practicePlan[format(selectedDate, 'yyyy-MM-dd')], format(selectedDate, 'yyyy-MM-dd'))
                  ) : (
                    <p className="text-center text-gray-500">No practice items scheduled for this date.</p>
                  )}
                </ScrollArea>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="list" className="mt-6">
            <ScrollArea className="h-[700px] w-full pr-4">
              {Object.entries(practicePlan).sort(([a], [b]) => new Date(a) - new Date(b)).map(([date, items]) => (
                <div key={date} className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">{format(parseISO(date), 'MMMM d, yyyy')}</h3>
                  {renderPracticeItems(items, date)}
                </div>
              ))}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}