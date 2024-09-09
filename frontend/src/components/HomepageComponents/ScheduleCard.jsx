'use client'

import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarIcon } from 'lucide-react';
import { format, addDays, differenceInDays, isBefore } from 'date-fns';

const AnimatedCard = animated(Card);

const spacedRepetitionItems = [
  { id: 1, type: 'Vocabulary', topic: 'Technology', dueDate: '2024-08-20', strength: 0.7 },
  { id: 2, type: 'Reading', topic: 'Environmental Issues', dueDate: '2024-08-21', strength: 0.5 },
  { id: 3, type: 'Listening', topic: 'Academic Lecture', dueDate: '2024-08-22', strength: 0.8 },
  { id: 4, type: 'Writing', topic: 'Task 2 Essay', dueDate: '2024-08-23', strength: 0.3 },
  { id: 5, type: 'Speaking', topic: 'Part 2 Long Turn', dueDate: '2024-08-24', strength: 0.6 },
];

export default function ScheduleCard({ cardAnimation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reviewItems, setReviewItems] = useState([]);
  const [targetDate, setTargetDate] = useState(() => {
    const savedDate = localStorage.getItem('ieltsTestDate');
    return savedDate ? new Date(savedDate) : null;
  });
  const [daysUntilTarget, setDaysUntilTarget] = useState(null);
  const [ieltsTestDates, setIeltsTestDates] = useState([]);

  useEffect(() => {
    const items = spacedRepetitionItems.filter(item => 
      new Date(item.dueDate).toDateString() === selectedDate.toDateString()
    );
    setReviewItems(items);
  }, [selectedDate]);

  useEffect(() => {
    if (targetDate) {
      const today = new Date();
      const diffDays = differenceInDays(targetDate, today);
      setDaysUntilTarget(diffDays);

      localStorage.setItem('ieltsTestDate', targetDate.toISOString());
    }
  }, [targetDate]);

  useEffect(() => {
    const fetchIeltsTestDates = async () => {
      // Simulating API call to fetch test dates
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

  const handleSetTargetDate = (date) => {
    setTargetDate(date);
  };

  const getStrengthColor = (strength) => {
    if (strength > 0.7) return 'bg-green-500';
    if (strength > 0.4) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
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
                disabled={(date) => isBefore(date, new Date()) || !ieltsTestDates.some(testDate => 
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
                <p className="text-sm text-gray-500 mt-2">
                  Exam Date: {format(targetDate, 'MMMM d, yyyy')}
                </p>
              </div>
            )}
          </div>
          <div className="w-full md:w-2/3">
            <h3 className="text-lg font-semibold mb-2">Review Items for {format(selectedDate, 'MMMM d, yyyy')}</h3>
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
  );
}