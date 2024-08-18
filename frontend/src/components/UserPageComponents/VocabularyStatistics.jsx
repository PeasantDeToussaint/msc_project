import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import axios from 'axios';

export default function VocabularyStatistics() {
  const [activeSection, setActiveSection] = useState('advanced');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const jwtToken = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Clear any previous errors
      try {
        let response;
        const headers = {
          'Authorization': `Bearer ${jwtToken}`
        };

        switch (activeSection) {
          case 'misspelled':
            response = await axios.get('http://localhost:3000/misSpellings/misSpellings', { headers });
            setData({ misspelledWords: response.data.misspelledWords || [] });
            break;
          case 'repeated':
            response = await axios.get('http://localhost:3000/repeatedWords/repeatedWords', { headers });
            setData({ repeatedWords: response.data.commonWords || [] });
            break;
          case 'rare':
            response = await axios.get('http://localhost:3000/rareWords/rareWords', { headers });
            setData({ rareWords: response.data.rareWords || [] });
            break;
          case 'lexicalDensity':
            response = await axios.get('http://localhost:3000/lexicalDensity/lexicalDensity', { headers });
            setData({ lexicalDensity: response.data.lexicalDensity || 0 });
            break;
          case 'advanced':
            response = await axios.get('http://localhost:3000/advancedVocabulary/advancedVocabulary', { headers });
            setData({ advancedWordsUsed: response.data.advancedWordsUsed || {} });
            break;
          default:
            break;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data.');
      }
      setLoading(false);
    };

    fetchData();
  }, [activeSection, jwtToken]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6 text-base">
      <header className="text-center">
        <p className="text-muted-foreground text-base">Analyze and improve your vocabulary in your writings with statistics and insights.</p>
      </header>

      <nav className="flex justify-center space-x-2 overflow-x-auto">
        {[
          { key: 'misspelled', label: 'Misspelled Words' },
          { key: 'repeated', label: 'Repeated Words' },
          { key: 'rare', label: 'Rare Words' },
          { key: 'lexicalDensity', label: 'Lexical Density' },
          { key: 'advanced', label: 'Advanced Vocabulary' }
        ].map((section) => (
          <Button
            key={section.key}
            variant={activeSection === section.key ? 'default' : 'outline'}
            onClick={() => setActiveSection(section.key)}
            size="sm"
            className="text-base"
          >
            {section.label}
          </Button>
        ))}
      </nav>

      <main className="grid gap-6">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">
            {error}
          </div>
        ) : (
          <>
            {activeSection === 'misspelled' && data.misspelledWords?.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Misspelled Words</CardTitle>
                  <CardDescription className="text-base">Common misspellings and their corrections</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <thead>
                      <TableRow>
                        <TableHead className="text-base">Word</TableHead>
                        <TableHead className="text-base">Suggested Correction</TableHead>
                        <TableHead className="text-base">Frequency</TableHead>
                      </TableRow>
                    </thead>
                    <tbody>
                      {data.misspelledWords.map((word, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-base">{word.word}</TableCell>
                          <TableCell className="text-base">{word.suggestedCorrection}</TableCell>
                          <TableCell className="text-base">{word.frequency}</TableCell>
                        </TableRow>
                      ))}
                    </tbody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {activeSection === 'repeated' && data.repeatedWords?.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Repeated Words</CardTitle>
                  <CardDescription className="text-base">Frequently repeated words</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <thead>
                      <TableRow>
                        <TableHead className="text-base">Word</TableHead>
                        <TableHead className="text-base">Occurrences</TableHead>
                      </TableRow>
                    </thead>
                    <tbody>
                      {data.repeatedWords.map((word, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-base">{word.word}</TableCell>
                          <TableCell className="text-base">{word.occurrences}</TableCell>
                        </TableRow>
                      ))}
                    </tbody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {activeSection === 'rare' && data.rareWords?.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Rare Word Usage</CardTitle>
                  <CardDescription className="text-base">Uncommon words used in your writing</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {data.rareWords.map((word, index) => (
                      <li key={index} className="bg-muted p-4 rounded-lg">
                        <div className="font-bold text-lg">{word}</div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {activeSection === 'lexicalDensity' && data.lexicalDensity !== undefined && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Lexical Density</CardTitle>
                  <CardDescription className="text-base">
                    The ratio of unique words to total words in your writing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <span className="text-3xl font-bold">{data.lexicalDensity}%</span>
                  </div>
                  <Progress value={data.lexicalDensity} className="w-full h-3 mb-3" />
                  <p className="text-base text-muted-foreground">
                    Lexical density is a measure of the proportion of content words (nouns, verbs, adjectives, and adverbs) to the total number of words. A higher lexical density indicates more informative and complex writing, which is important for IELTS writing tasks.
                  </p>
                </CardContent>
              </Card>
            )}

            {activeSection === 'advanced' && data.advancedWordsUsed && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Advanced Vocabulary</CardTitle>
                  <CardDescription className="text-base">Examples of advanced words used in your writing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(data.advancedWordsUsed).map(([word, details], index) => (
                      <div key={index} className="bg-muted p-3 rounded-lg">
                        <div className="font-bold text-lg">{word}</div>
                        <div className="text-base text-muted-foreground">{details.definition}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </main>
    </div>
  );
}
