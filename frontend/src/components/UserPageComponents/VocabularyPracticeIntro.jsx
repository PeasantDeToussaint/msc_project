import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";


const wordSets = [
  { id: "barrons3000", name: "Barron's 3000" },
  { id: "ielts1000", name: "IELTS Writing 1000" },
  { id: "toefl5000", name: "TOEFL 5000" },
  { id: "gre3500", name: "GRE 3500" },
  { id: "sat1500", name: "SAT 1500" },
  { id: "academic5000", name: "Academic Word List 5000" },
];

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const slideIn = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function Component() {
  const [settings, setSettings] = useState({
    wordSet: "",  // Initially empty to ensure no set is selected by default
    wordCount: 10,
    timePerQuestion: 30,
  });

  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (settings.wordSet) {
      navigate('/VocabularyPractice', { state: settings });
    }
  };

  const isStartDisabled = !settings.wordSet; // Disable start if no word set is selected

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardTitle className="text-4xl font-bold text-center mb-6">Vocabulary Quiz Setup</CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex gap-8">
            <motion.div className="w-1/2 space-y-6" variants={slideIn}>
              <h2 className="text-2xl font-semibold">Select a Vocab list</h2>
              <div>
                <Select
                  onValueChange={(value) => setSettings({ ...settings, wordSet: value })}
                  value={settings.wordSet}
                >
                  <SelectTrigger id="word-set" className="w-full">
                    <SelectValue placeholder="Choose a word set" />
                  </SelectTrigger>
                  <SelectContent>
                    <AnimatePresence>
                      {wordSets.map((set) => (
                        <motion.div
                          key={set.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <SelectItem value={set.id}>{set.name}</SelectItem>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
            <Separator orientation="vertical" className="h-auto" />
            <motion.div className="w-1/2 space-y-6" variants={slideIn}>
              <h2 className="text-2xl font-semibold">Quiz Settings</h2>
              <div>
                <Label htmlFor="word-count" className="text-lg mb-2 block">
                  Number of Words: {settings.wordCount}
                </Label>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Slider
                    id="word-count"
                    min={5}
                    max={50}
                    step={5}
                    value={[settings.wordCount]}
                    onValueChange={(value) => setSettings({ ...settings, wordCount: value[0] })}
                    className="w-full"
                  />
                </motion.div>
              </div>
              <div>
                <Label htmlFor="time-per-question" className="text-lg mb-2 block">
                  Time per Question: {settings.timePerQuestion} seconds
                </Label>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Slider
                    id="time-per-question"
                    min={10}
                    max={60}
                    step={5}
                    value={[settings.timePerQuestion]}
                    onValueChange={(value) => setSettings({ ...settings, timePerQuestion: value[0] })}
                    className="w-full"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <motion.div whileHover={isStartDisabled ? {} : { scale: 1.05 }} whileTap={isStartDisabled ? {} : { scale: 0.95 }}>
            <Button onClick={handleStartQuiz} className="w-full py-6 text-xl" disabled={isStartDisabled}>
              Start Quiz
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
