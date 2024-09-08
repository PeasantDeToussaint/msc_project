import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Headphones, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const BASE_URL = import.meta.env.VITE_BASE_URL || `http://localhost:${import.meta.env.VITE_ALLOCATED_PORT}`;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Component() {
  const [selectedTest, setSelectedTest] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [availableTests, setAvailableTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvailableTests = async () => {
      try {
        const response = await fetch(`${BASE_URL}/listeningQuestions/availableTest`);
        if (!response.ok) throw new Error('Failed to fetch available tests');
        const data = await response.json();
        setAvailableTests(data);
      } catch (error) {
        console.error('Error fetching available tests:', error);
      }
    };

    fetchAvailableTests();
  }, []);

  const handleStartPractice = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (selectedTest) navigate(`/ListeningPractice/${selectedTest}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Headphones className="mx-auto h-16 w-16 text-primary" />
        </motion.div>

        <motion.div {...fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>Start Practice</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Select a test to begin your practice session.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Select onValueChange={setSelectedTest}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Select a test" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTests.map((test) => (
                      <SelectItem key={test.toString()} value={test.toString()}>
                        Test {test}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  onClick={handleStartPractice}
                  disabled={!selectedTest || isLoading}
                  className="w-full sm:w-auto relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-primary/20"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isLoading ? 1 : 0 }}
                    transition={{ duration: 1 }}
                  />
                  <motion.div className="relative z-10 flex items-center justify-center">
                    <Play className="mr-2 h-4 w-4" />
                    {isLoading ? 'Loading...' : 'Start Practice'}
                  </motion.div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}