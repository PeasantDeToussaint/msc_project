import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Component() {
  const [activeSection, setActiveSection] = useState('misspelled');

  const misspelledWords = [
    { word: 'accomodate', correction: 'accommodate', frequency: 5 },
    { word: 'seperate', correction: 'separate', frequency: 8 },
    { word: 'occured', correction: 'occurred', frequency: 3 },
  ];

  const repeatedWords = [
    { word: 'very', occurrences: 15, suggestions: ['extremely', 'highly', 'incredibly'] },
    { word: 'good', occurrences: 12, suggestions: ['excellent', 'great', 'superb'] },
    { word: 'but', occurrences: 20, suggestions: ['however', 'nevertheless', 'yet'] },
  ];

  const rareWords = [
    { word: 'ephemeral', rating: 8, context: 'The ephemeral nature of fashion trends.' },
    { word: 'ubiquitous', rating: 7, context: 'Smartphones have become ubiquitous in modern society.' },
    { word: 'serendipity', rating: 9, context: 'Their meeting was a moment of pure serendipity.' },
  ];

  const suggestedWords = [
    { word: 'eloquent', learned: true },
    { word: 'pragmatic', learned: false },
    { word: 'resilient', learned: true },
    { word: 'innovative', learned: false },
    { word: 'diligent', learned: true },
  ];

  const mostUsedWords = [
    { word: 'the', count: 152 },
    { word: 'and', count: 98 },
    { word: 'to', count: 86 },
    { word: 'of', count: 75 },
    { word: 'in', count: 67 },
    { word: 'that', count: 58 },
    { word: 'is', count: 50 },
    { word: 'for', count: 45 },
    { word: 'it', count: 40 },
    { word: 'with', count: 35 },
  ];

  const advancedVocabulary = [
    { word: 'ubiquitous', definition: 'present, appearing, or found everywhere' },
    { word: 'ephemeral', definition: 'lasting for a very short time' },
    { word: 'pragmatic', definition: 'dealing with things sensibly and realistically' },
  ];

  const lexicalDensity = 56;
  const spellingAccuracy = 92;

  const maxFrequency = Math.max(...misspelledWords.map((w) => w.frequency));
  const maxOccurrences = Math.max(...repeatedWords.map((w) => w.occurrences));

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6 text-base">
      <header className="text-center">
        <p className="text-muted-foreground text-base">Analyze and improve your vocabulary with comprehensive statistics and insights.</p>
      </header>

      <nav className="flex justify-center space-x-2 overflow-x-auto">
        {['misspelled', 'repeated', 'rare', 'suggested', 'mostUsed', 'lexicalDensity', 'advanced', 'spelling'].map((section) => (
          <Button
            key={section}
            variant={activeSection === section ? 'default' : 'outline'}
            onClick={() => setActiveSection(section)}
            size="sm"
            className="text-base"
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </Button>
        ))}
      </nav>

      <main className="grid gap-6">
        {activeSection === 'misspelled' && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Misspelled Words</CardTitle>
              <CardDescription className="text-base">Common misspellings and their corrections</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-base">Word</TableHead>
                    <TableHead className="text-base">Suggested Correction</TableHead>
                    <TableHead className="text-base">Frequency</TableHead>
                    <TableHead className="text-base">Chart</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {misspelledWords.map((word) => (
                    <TableRow key={word.word}>
                      <TableCell className="text-base">{word.word}</TableCell>
                      <TableCell className="text-base">{word.correction}</TableCell>
                      <TableCell className="text-base">{word.frequency}</TableCell>
                      <TableCell>
                        <div className="w-full bg-muted rounded-full h-3">
                          <div
                            className="bg-primary rounded-full h-3"
                            style={{ width: `${(word.frequency / maxFrequency) * 100}%` }}
                          ></div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeSection === 'repeated' && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Repeated Words</CardTitle>
              <CardDescription className="text-base">Frequently repeated words and suggested alternatives</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-base">Word</TableHead>
                    <TableHead className="text-base">Occurrences</TableHead>
                    <TableHead className="text-base">Suggestions</TableHead>
                    <TableHead className="text-base">Heatmap</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {repeatedWords.map((word) => (
                    <TableRow key={word.word}>
                      <TableCell className="text-base">{word.word}</TableCell>
                      <TableCell className="text-base">{word.occurrences}</TableCell>
                      <TableCell className="text-base">{word.suggestions.join(', ')}</TableCell>
                      <TableCell>
                        <div
                          className="w-full h-4 rounded"
                          style={{
                            backgroundColor: `rgba(220, 38, 38, ${word.occurrences / maxOccurrences})`,
                          }}
                        ></div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeSection === 'rare' && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Rare Word Usage</CardTitle>
              <CardDescription className="text-base">Uncommon words used in your writing</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {rareWords.map((word) => (
                  <li key={word.word} className="bg-muted p-4 rounded-lg">
                    <div className="font-bold text-lg">{word.word}</div>
                    <div className="flex items-center mt-2">
                      <span className="mr-2 text-base">Rarity:</span>
                      <Progress value={word.rating * 10} className="w-full h-3" />
                      <span className="ml-2 text-base">{word.rating}/10</span>
                    </div>
                    <div className="mt-2 text-base">
                      <span className="font-semibold">Example:</span> {word.context}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {activeSection === 'suggested' && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Suggested Words to Learn</CardTitle>
              <CardDescription className="text-base">Personalized recommendations to improve your vocabulary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suggestedWords.map((word) => (
                  <div key={word.word} className="flex items-center justify-between bg-muted p-3 rounded-lg">
                    <span className="text-lg">{word.word}</span>
                    <Badge variant={word.learned ? 'default' : 'secondary'} className="text-base">
                      {word.learned ? 'Learned' : 'To Learn'}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Progress</h3>
                <Progress value={(suggestedWords.filter((w) => w.learned).length / suggestedWords.length) * 100} className="w-full h-3" />
                <p className="text-base text-muted-foreground mt-2">
                  {suggestedWords.filter((w) => w.learned).length} out of {suggestedWords.length} words learned
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection === 'mostUsed' && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Most Used Words</CardTitle>
              <CardDescription className="text-base">Your most frequently used words</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-3 mb-4">
                {mostUsedWords.map((word) => (
                  <div
                    key={word.word}
                    className="bg-primary/10 text-primary px-3 py-2 rounded"
                    style={{
                      fontSize: `${Math.max(0.75, Math.min(2.5, word.count / 30))}rem`,
                      opacity: Math.max(0.6, Math.min(1, word.count / 100)),
                    }}
                  >
                    {word.word}
                  </div>
                ))}
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-base">Word</TableHead>
                    <TableHead className="text-base">Count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mostUsedWords.map((word) => (
                    <TableRow key={word.word}>
                      <TableCell className="text-base">{word.word}</TableCell>
                      <TableCell className="text-base">{word.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeSection === 'lexicalDensity' && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Lexical Density</CardTitle>
              <CardDescription className="text-base">The ratio of unique words to total words in your writing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold">{lexicalDensity}%</span>
              </div>
              <Progress value={lexicalDensity} className="w-full h-3 mb-3" />
              <p className="text-base text-muted-foreground">
                Lexical density is a measure of the proportion of content words (nouns, verbs, adjectives, and adverbs) to the total number of words. A higher lexical density indicates more informative and complex writing, which is important for IELTS writing tasks.
              </p>
            </CardContent>
          </Card>
        )}

        {activeSection === 'advanced' && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Advanced Vocabulary</CardTitle>
              <CardDescription className="text-base">Examples of advanced words used in your writing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {advancedVocabulary.map((word) => (
                  <div key={word.word} className="bg-muted p-3 rounded-lg">
                    <div className="font-bold text-lg">{word.word}</div>
                    <div className="text-base text-muted-foreground">{word.definition}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Vocabulary Score</h3>
                <div className="flex items-center">
                  <Progress value={75} className="w-full h-3 mr-2" />
                  <span className="font-bold text-lg">7.5/9</span>
                </div>
                <p className="text-base text-muted-foreground mt-2">
                  Your use of advanced vocabulary is impressive. Keep incorporating these words in your writing to maintain and improve your score.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection === 'spelling' && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Spelling Accuracy</CardTitle>
              <CardDescription className="text-base">Your overall spelling performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-6">
                <svg viewBox="0 0 100 100" width="100" height="100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="10"
                    strokeDasharray={`${spellingAccuracy * 2.83} 283`}
                    transform="rotate(-90 50 50)"
                  />
                  <text x="50" y="50" textAnchor="middle" dy="7" fontSize="16" fontWeight="bold">
                    {spellingAccuracy}%
                  </text>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Tips to Improve</h3>
              <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground">
                <li>Practice writing commonly misspelled words</li>
                <li>Use mnemonics to remember tricky spellings</li>
                <li>Read extensively to expose yourself to correct spellings</li>
                <li>Use a dictionary or spell-checker when unsure</li>
              </ul>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
