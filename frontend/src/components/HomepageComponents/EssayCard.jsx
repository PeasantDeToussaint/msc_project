'use client'

import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Book, PlusCircle } from 'lucide-react';

const AnimatedCard = animated(Card);

export default function EssaysCard({ cardAnimation }) {
  const [essayTitles, setEssayTitles] = useState([
    { id: 1, title: "The impact of technology on education", date: "2023-08-15", content: "Technology has revolutionized..." },
    { id: 2, title: "Climate change and its effects on agriculture", date: "2023-08-10", content: "Climate change poses significant challenges..." },
    { id: 3, title: "The role of social media in modern society", date: "2023-08-05", content: "Social media has become an integral part..." },
  ]);
  const [newEssayTitle, setNewEssayTitle] = useState('');
  const [newEssayContent, setNewEssayContent] = useState('');
  const [selectedEssay, setSelectedEssay] = useState(null);

  const handleAddNewEssay = () => {
    if (newEssayTitle && newEssayContent) {
      const newEssay = {
        id: essayTitles.length + 1,
        title: newEssayTitle,
        date: new Date().toISOString().split('T')[0],
        content: newEssayContent
      };
      setEssayTitles([...essayTitles, newEssay]);
      setNewEssayTitle('');
      setNewEssayContent('');
    }
  };

  const handleViewEssay = (essay) => {
    setSelectedEssay(essay);
  };

  return (
    <AnimatedCard style={cardAnimation}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center justify-between">
          <span className="flex items-center">
            <Book className="w-5 h-5 mr-2" />
            Past Essay Topics
          </span>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add New Essay
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Essay</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="name"
                    value={newEssayTitle}
                    onChange={(e) => setNewEssayTitle(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="content" className="text-right">
                    Content
                  </Label>
                  <Textarea
                    id="content"
                    value={newEssayContent}
                    onChange={(e) => setNewEssayContent(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddNewEssay}>Add Essay</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
          {essayTitles.map((essay) => (
            <div key={essay.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
              <span className="font-medium">{essay.title}</span>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-4">{essay.date}</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" onClick={() => handleViewEssay(essay)}>View</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>{selectedEssay?.title}</DialogTitle>
                    </DialogHeader>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Date: {selectedEssay?.date}</p>
                      <ScrollArea className="h-[300px] w-full mt-4">
                        <p className="text-sm">{selectedEssay?.content}</p>
                      </ScrollArea>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </AnimatedCard>
  );
}