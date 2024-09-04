// VocabularyStatistics.js
import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from 'framer-motion';
import { useVocabularyData } from './useVocabularyData';

// Sections array for different vocabulary data types
const sections = [
  { key: 'overview', label: 'Overview' },
  { key: 'misspelled', label: 'Misspelled' },
  { key: 'repeated', label: 'Repeated' },
  { key: 'rare', label: 'Rare' },
  { key: 'advanced', label: 'Advanced' },
];

// Loading fallback component to show a spinner during data fetch
function LoadingFallback() {
  return (
    <div className="flex justify-center items-center h-48">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  );
}

// Error fallback component to handle and display errors
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error.message}
        <button onClick={resetErrorBoundary} className="ml-2 underline">Try again</button>
      </AlertDescription>
    </Alert>
  );
}

// Progress Circle for Lexical Density
function RadialProgress({ value }) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-stone-300"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          className="text-blue-600"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold">{value}%</span>
      </div>
    </div>
  );
}

// Word Cloud for rare words
function WordCloud({ words, maxFontSize = 24, minFontSize = 12 }) {
  const maxCount = Math.max(...words.map(w => w.count));
  
  return (
    <div className="flex flex-wrap justify-center gap-2 p-4">
      {words.map((word, index) => {
        const fontSize = ((word.count / maxCount) * (maxFontSize - minFontSize)) + minFontSize;
        return (
          <motion.span
            key={index}
            className="inline-block"
            style={{ fontSize: `${fontSize}px` }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {word.text}
          </motion.span>
        );
      })}
    </div>
  );
}

// HeatMap for repeated words
function HeatMap({ words }) {
  const maxOccurrences = Math.max(...words.map(w => w.occurrences));

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {words.map((word, index) => {
        const intensity = (word.occurrences / maxOccurrences) * 100;
        return (
          <motion.div
            key={index}
            className="p-2 rounded"
            style={{ backgroundColor: `hsla(220, 100%, 50%, ${intensity}%)` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <span className="font-medium text-white">{word.word}</span>
            <span className="ml-2 text-sm text-white/80">{word.occurrences}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

// Underline animation for misspelled words with enhanced correction
function AnimatedUnderline({ word, enhancedCorrection, frequency }) {
  const [correction, definition, example] = enhancedCorrection.split('\n');

  return (
    <div className="group relative inline-block mr-4 mb-2">
      <span className="text-red-500">{word}</span>
      <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
      <div className="absolute left-0 -top-32 bg-black text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-64 z-10">
        <p>{correction}</p>
        <p>{definition}</p>
        <p>{example}</p>
        <p>Frequency: {frequency}</p>
      </div>
    </div>
  );
}

// Card for advanced words
function AdvancedWordCard({ word, definition, usage, count }) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{word}</CardTitle>
        {count && <CardDescription>Used {count} time(s)</CardDescription>}
      </CardHeader>
      <CardContent>
        <p><strong>Definition:</strong> {definition}</p>
        {usage && <p><strong>Example:</strong> {usage}</p>}
      </CardContent>
    </Card>
  );
}

// Section Content component rendering each section's data
function SectionContent({ section, data }) {
  switch (section) {
    case 'overview':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Lexical Density</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <RadialProgress value={data.lexicalDensity || 0} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Word Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Total Words: {data.totalWords || 0}</li>
                <li>Unique Words: {data.uniqueWords || 0}</li>
                <li>Content Words: {data.contentWords || 0}</li>
                <li>Misspelled Words: {data.misspelledWords?.length || 0}</li>
                <li>Advanced Words: {Object.keys(data.advancedWordsUsed || {}).length}</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      );
    case 'misspelled':
      return (
        <div className="flex flex-wrap">
          {data.misspelledWords?.map((word, index) => (
            <AnimatedUnderline 
              key={index} 
              word={word.word} 
              enhancedCorrection={word.enhancedCorrection} 
              frequency={word.frequency}
            />
          ))}
        </div>
      );
    case 'repeated':
      return <HeatMap words={data.repeatedWords || []} />;
    case 'rare':
      return <WordCloud words={data.rareWords?.map(word => ({ text: word, count: 1 })) || []} />;
    case 'advanced':
      return (
        <div>
          <p className="mb-4">{data.advancedWordsMessage}</p>
          <h3 className="text-xl font-bold mb-4">Advanced Words Used</h3>
          {Object.entries(data.advancedWordsUsed).map(([word, details], index) => (
            <AdvancedWordCard 
              key={index}
              word={word}
              definition={details.definition}
              count={details.count}
            />
          ))}
          <h3 className="text-xl font-bold my-4">Suggested Advanced Words</h3>
          {data.advancedWordsSuggestions.map((word, index) => (
            <AdvancedWordCard 
              key={index}
              word={word.word}
              definition={word.definition}
              usage={word.usage}
            />
          ))}
        </div>
      );
    default:
      return null;
  }
}

// VocabularyStatistics Component
export default function VocabularyStatistics() {
  const [activeSection, setActiveSection] = useState('overview');
  const { data, error, isLoading } = useVocabularyData(activeSection);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <header className="text-center">
        <h1 className="text-3xl font-bold mb-2">Vocabulary Insights</h1>
        <p className="text-stone-600">
          Discover the richness and areas for improvement in your writing.
        </p>
      </header>

      <Tabs value={activeSection} onValueChange={setActiveSection}>
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
          {sections.map((section) => (
            <TabsTrigger key={section.key} value={section.key}>
              {section.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {sections.map((section) => (
          <TabsContent key={section.key} value={section.key}>
            <Card>
              <CardHeader>
                <CardTitle>{section.label}</CardTitle>
                <CardDescription>
                  {section.key === 'overview' && 'A snapshot of your vocabulary usage'}
                  {section.key === 'misspelled' && 'Words that might need correction'}
                  {section.key === 'repeated' && 'Words you use frequently'}
                  {section.key === 'rare' && 'Uncommon words in your writing'}
                  {section.key === 'advanced' && 'Sophisticated vocabulary you\'ve employed'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  {isLoading ? (
                    <LoadingFallback />
                  ) : error ? (
                    <ErrorFallback error={error} />
                  ) : (
                    <SectionContent section={section.key} data={data} />
                  )}
                </ErrorBoundary>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
