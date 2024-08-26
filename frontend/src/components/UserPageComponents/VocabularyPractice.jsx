import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Clock, Lightbulb, Download, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const wordSets = {
  "Barron's 3000": ["abate", "aberrant", "abeyance", "abject", "abjure", "ablution", "abnegate", "abominate", "abortive", "abrade"],
  "IELTS Writing 1000": ["abandon", "ability", "able", "about", "above", "abroad", "absence", "absolute", "absolutely", "absorb"],
};

const generateSentence = (word) => {
  const sentences = {
    "abate": "The storm began to abate as the winds died down and the rain lessened.",
    "aberrant": "The scientist noticed an aberrant result in the experiment that didn't fit the expected pattern.",
    "ability": "Her ability to solve complex mathematical problems impressed her professors.",
    "abroad": "Studying abroad for a semester expanded her cultural horizons and language skills.",
  };
  return sentences[word] || `The word "${word}" is an important vocabulary term to learn.`;
};

export default function AdvancedVocabQuizComponent() {
  const location = useLocation();
  const { wordSet: initialWordSet, wordCount, timePerQuestion } = location.state;

  const [wordSet, setWordSet] = useState(initialWordSet || "Barron's 3000");
  const [currentWords, setCurrentWords] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [showResults, setShowResults] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [wordHistory, setWordHistory] = useState([]);

  useEffect(() => {
    const selectRandomWords = () => {
      const allWords = wordSets[wordSet];
      const selectedWords = allWords
        .sort(() => 0.5 - Math.random())
        .slice(0, wordCount)
        .map((word) => ({
          word,
          sentence: generateSentence(word),
          definition: "Sample definition", // Replace with actual definition
          synonyms: ["synonym1", "synonym2"], // Replace with actual synonyms
          antonyms: ["antonym1", "antonym2"], // Replace with actual antonyms
          lastReviewed: null,
          nextReview: null,
        }));
      setCurrentWords(selectedWords);
      setCurrentQuestionIndex(0);
      setScore(0);
      setStreak(0);
      generateOptions(selectedWords[0].word, allWords);
    };
    selectRandomWords();
  }, [wordSet, wordCount]);

  const generateOptions = (correctWord, allWords) => {
    const incorrectOptions = allWords
      .filter((word) => word !== correctWord)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const allOptions = [correctWord, ...incorrectOptions].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
  };

  useEffect(() => {
    if (timeLeft > 0 && !isCorrect) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isCorrect) {
      handleAnswer("");
    }
  }, [timeLeft, isCorrect]);

  const handleAnswer = useCallback(
    (choice) => {
      const correct = choice === currentWords[currentQuestionIndex].word;
      setSelectedAnswer(choice);
      setIsCorrect(correct);
      if (correct) {
        setScore(score + 1);
        setStreak(streak + 1);
      } else {
        setStreak(0);
      }
      const updatedWord = {
        ...currentWords[currentQuestionIndex],
        lastReviewed: new Date(),
        nextReview: new Date(Date.now() + (correct ? 3 : 1) * 24 * 60 * 60 * 1000), // 3 days if correct, 1 day if incorrect
      };
      setWordHistory([...wordHistory, updatedWord]);
    },
    [currentQuestionIndex, currentWords, score, streak, wordHistory]
  );

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < currentWords.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer("");
      setIsCorrect(null);
      setShowHint(false);
      setTimeLeft(timePerQuestion);
      generateOptions(currentWords[nextIndex].word, wordSets[wordSet]);
    } else {
      setShowResults(true);
    }
  }, [currentQuestionIndex, currentWords, wordSet, timePerQuestion]);

  const handleKeyPress = useCallback(
    (event) => {
      if (isCorrect === null) {
        const key = event.key.toLowerCase();
        if (key === "1" || key === "2" || key === "3" || key === "4") {
          const index = parseInt(key) - 1;
          if (index < options.length) {
            handleAnswer(options[index]);
          }
        } else if (key === "h") {
          setShowHint(true);
        }
      } else if (event.key === "Enter") {
        nextQuestion();
      }
    },
    [isCorrect, options, handleAnswer, nextQuestion]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const exportProgress = () => {
    const data = JSON.stringify(wordHistory, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vocab_progress.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const progress = ((currentQuestionIndex + 1) / currentWords.length) * 100;

  return (
    <div className={`container mx-auto px-4 py-8 ${darkMode ? "dark" : ""}`}>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center mb-4">Advanced Vocabulary Quiz</CardTitle>
          <div className="flex justify-between items-center">
            <Select onValueChange={(value) => setWordSet(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Word Set" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Barron's 3000">Barron's 3000</SelectItem>
                <SelectItem value="IELTS Writing 1000">IELTS Writing 1000</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Clock className="mr-2" />
                <span className="text-xl font-semibold">{timeLeft}s</span>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Switch
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                      className="data-[state=checked]:bg-slate-700"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle Dark Mode</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="mb-6" />
          {currentWords.length > 0 && (
            <>
              <p className="text-2xl mb-6 text-center">
                {currentWords[currentQuestionIndex].sentence.replace(currentWords[currentQuestionIndex].word, "________")}
              </p>
              <div className="grid grid-cols-2 gap-6 mb-6">
                {options.map((word, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === word ? "default" : "outline"}
                    className="p-6 text-xl"
                    onClick={() => handleAnswer(word)}
                    disabled={isCorrect !== null}
                  >
                    {index + 1}. {word}
                  </Button>
                ))}
              </div>
              <AnimatePresence>
                {isCorrect !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`mt-4 p-4 rounded-md ${
                      isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {isCorrect ? (
                      <div className="flex items-center">
                        <Check className="mr-2" />
                        <span>Correct! The word is "{currentWords[currentQuestionIndex].word}".</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <X className="mr-2" />
                        <span>
                          Incorrect. The correct word is "{currentWords[currentQuestionIndex].word}".
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-blue-100 text-blue-800 rounded-md"
                >
                  <Lightbulb className="inline mr-2" />
                  Definition: {currentWords[currentQuestionIndex].definition}
                  <br />
                  Synonyms: {currentWords[currentQuestionIndex].synonyms.join(", ")}
                  <br />
                  Antonyms: {currentWords[currentQuestionIndex].antonyms.join(", ")}
                </motion.div>
              )}
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div>
            <p className="text-lg">
              Score: {score} / {currentWords.length}
            </p>
            <p className="text-lg">Streak: {streak}</p>
          </div>
          {isCorrect === null && (
            <Button onClick={() => setShowHint(true)} disabled={showHint}>
              <Lightbulb className="mr-2" /> Hint
            </Button>
          )}
          {isCorrect !== null && currentQuestionIndex < currentWords.length - 1 && (
            <Button onClick={nextQuestion}>Next Question</Button>
          )}
          {isCorrect !== null && currentQuestionIndex === currentWords.length - 1 && (
            <Button onClick={() => setShowResults(true)}>See Results</Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Quiz Results</DialogTitle>
            <DialogDescription>
              You've completed the {wordSet} quiz!
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-lg mb-2">Final Score: {score} / {currentWords.length}</p>
            <p className="text-lg mb-4">Longest Streak: {streak}</p>
            <Button onClick={exportProgress} className="w-full mb-2">
              <Download className="mr-2" /> Export Progress
            </Button>
            <Button onClick={() => window.location.reload()} className="w-full">
              Start New Quiz
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
