'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, HelpCircle, Book, PlusCircle, Search, ArrowUpDown, BarChart } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { motion, AnimatePresence } from 'framer-motion'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useVocabularyData } from '../../components/UserPageComponents/useVocabularyData'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFetchEssays } from './useFetchEssays'

const vocabularySections = [
  { key: 'overview', label: 'Overview of the vocabulary used in your essays', icon: BarChart },
  { key: 'misspelled', label: 'Misspelled words', icon: HelpCircle },
  { key: 'repeated', label: 'Repeatedly used words in your essays', icon: ArrowUpDown },
  { key: 'rare', label: 'Rare words used in your essay', icon: Book },
  { key: 'advanced', label: 'Advanced words that can boost your grade', icon: PlusCircle },
]

function LoadingFallback() {
  return (
    <div className="flex justify-center items-center h-24">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}

function ErrorFallback({ error }) {
  return (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  )
}

function RadialProgress({ value }) {
  const circumference = 2 * Math.PI * 30
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <div className="relative w-20 h-20">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-muted-foreground"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="50"
          cy="50"
        />
        <circle
          className="text-primary"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="50"
          cy="50"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold">{value}%</span>
      </div>
    </div>
  )
}

function SectionContent({ section, data }) {
  if (!data) return null;

  switch (section) {
    case 'overview':
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-1">Lexical Density</h3>
            <RadialProgress value={data.lexicalDensity || 0} />
          </div>
          <div>
            <ul className="space-y-1 text-sm">
              <li>Total Words: {data.totalWords || 0}</li>
              <li>Unique Words: {data.uniqueWords || 0}</li>
              <li>Content Words: {data.contentWords || 0}</li>
              <li>Misspelled: {data.misspelledWords?.length || 0}</li>
            </ul>
          </div>
        </div>
      )
    case 'misspelled':
      return (
        <div className="text-sm">
          {data.misspelledWords?.slice(0, 5).map((word, index) => (
            <div key={index} className="mb-1">
              <span className="text-destructive">{word.word}</span>
              <span className="text-muted-foreground ml-2">→ {word.enhancedCorrection.split('\n')[0]}</span>
            </div>
          )) || 'No misspelled words found.'}
        </div>
      )
    case 'repeated':
      return (
        <div className="text-sm">
          {data.repeatedWords?.slice(0, 5).map((word, index) => (
            <div key={index} className="mb-1">
              <span className="font-medium">{word.word}</span>
              <span className="text-muted-foreground ml-2">({word.occurrences} times)</span>
            </div>
          )) || 'No repeated words found.'}
        </div>
      )
    case 'rare':
      return (
        <div className="flex flex-wrap gap-2">
          {data.rareWords?.slice(0, 10).map((word, index) => (
            <span key={index} className="text-sm bg-secondary text-secondary-foreground px-2 py-1 rounded">
              {word}
            </span>
          )) || 'No rare words found.'}
        </div>
      )
    case 'advanced':
      return (
        <div className="text-sm">
          <h3 className="font-medium mb-2">Advanced Words Used:</h3>
          <ul className="list-disc list-inside">
            {Object.entries(data.advancedWordsUsed || {}).slice(0, 5).map(([word, details], index) => (
              <li key={index}>{word} ({details.count} time{details.count > 1 ? 's' : ''})</li>
            )) || 'No advanced words used.'}
          </ul>
        </div>
      )
    default:
      return null
  }
}

export default function VocabularyAndEssaysCard({ cardAnimation }) {
  const [activeVocabularySection, setActiveVocabularySection] = useState('overview');
  const { data, error, isLoading } = useVocabularyData(activeVocabularySection);
  const { essays, fetchError, isFetching } = useFetchEssays();

  const [selectedEssay, setSelectedEssay] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleViewEssay = useCallback((essay) => {
    setSelectedEssay(essay);
  }, []);

  const filteredAndSortedEssays = useMemo(() => {
    return essays
      .filter(essay => {
        const title = essay?.title?.toLowerCase() || '';
        return title.includes(searchTerm.toLowerCase());
      })
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return new Date(a.created_at) - new Date(b.created_at);
        } else {
          return new Date(b.created_at) - new Date(a.created_at);
        }
      });
  }, [essays, searchTerm, sortOrder]);

  return (
    <Card className="w-full" style={cardAnimation}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Writing Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Vocabulary Statistics</h3>
            <Select value={activeVocabularySection} onValueChange={setActiveVocabularySection}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select statistic" />
              </SelectTrigger>
              <SelectContent>
                {vocabularySections.map((section) => (
                  <SelectItem key={section.key} value={section.key}>
                    <div className="flex items-center">
                      <section.icon className="mr-2 h-4 w-4" />
                      {section.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Card className="p-4">
              {isLoading || isFetching ? (
                <LoadingFallback />
              ) : error || fetchError ? (
                <ErrorFallback error={error || fetchError} />
              ) : (
                <motion.div
                  key={activeVocabularySection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <SectionContent section={activeVocabularySection} data={data} />
                </motion.div>
              )}
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Past Essays</h3>
            </div>

            <div className="flex justify-between items-center">
              <div className="relative w-64">
                <Input
                  type="text"
                  placeholder="Search essays..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              >
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort by Date
              </Button>
            </div>

            <Card className="p-4">
              <ScrollArea className="h-[300px] w-full">
                <AnimatePresence>
                  {filteredAndSortedEssays.map((essay) => (
                    <Dialog key={essay.id}>
                      <DialogTrigger asChild>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.2 }}
                          className="flex justify-between items-center py-2 border-b last:border-b-0 cursor-pointer"
                          onClick={() => handleViewEssay(essay)}
                        >
                          <div>
                            <span className="font-medium">{essay.title}</span>
                            <span className="text-sm text-gray-500 ml-2">{new Date(essay.created_at).toLocaleDateString()}</span>
                            <p className="text-sm text-gray-500">Prompt: {essay.prompt}</p>
                            <p className="text-sm text-gray-500">Score: {essay.overall_score}</p>
                          </div>
                        </motion.div>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>{selectedEssay?.title}</DialogTitle>
                        </DialogHeader>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">Date: {new Date(selectedEssay?.created_at).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-500">Prompt: {selectedEssay?.prompt}</p>
                          <p className="text-sm text-gray-500">Score: {selectedEssay?.overall_score}</p>
                          <ScrollArea className="h-[300px] w-full mt-4">
                            <p className="text-sm">{selectedEssay?.essay}</p>
                          </ScrollArea>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </AnimatePresence>
              </ScrollArea>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}