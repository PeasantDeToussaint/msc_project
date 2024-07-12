import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Progress } from "@/components/ui/progress";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import encoderSingleton from '../lib/encoderSingleton';
import mediaRecorderSingleton from '../lib/mediaRecorderSingleton';

const SpeakingPractice = () => {
  const [questions, setQuestions] = useState({ part1: [], part2: [], part3: [] });
  const [recording, setRecording] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [completedRecordings, setCompletedRecordings] = useState([]);
  const [recordedBlobs, setRecordedBlobs] = useState({});
  const [recordedTexts, setRecordedTexts] = useState({});
  const timerRef = useRef(null);
  const location = useLocation();
  const { toast } = useToast();
  const selectedTopics = location.state?.selectedTopics || { part1: [], part2: [], part3: [] };
  const [audioBlobs, setAudioBlobs] = useState([]);
  const [capturedStream, setCapturedStream] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log('Fetching questions with selected topics:', selectedTopics);

        const response = await fetch('http://localhost:3000/speakingQuestions/selected-questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(selectedTopics)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setQuestions(selectOneQuestionPerGenre(data));
      } catch (error) {
        toast({
          title: 'Error',
          description: `Failed to fetch questions: ${error.message}`,
          status: 'error'
        });
      }
    };

    if (selectedTopics.part1.length > 0 && selectedTopics.part2.length > 0 && selectedTopics.part3.length > 0) {
      fetchQuestions();
    }
  }, [selectedTopics, toast]);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(timerRef.current);
      setIsRecording(false);
      setCompletedRecordings((prev) => [...prev, recording?.id]);
      setRecording(null);
      toast({
        title: "Recording Completed",
        description: "Your recording is complete.",
        status: "success"
      });
    }
  }, [timeLeft, recording, toast]);

  useEffect(() => {
    // Ensure the encoder is registered
    encoderSingleton;
  }, []);

  const selectOneQuestionPerGenre = (data) => {
    const selectRandomQuestion = (questions) => {
      const groupedQuestions = questions.reduce((acc, question) => {
        if (!acc[question.genre]) {
          acc[question.genre] = [];
        }
        acc[question.genre].push(question);
        return acc;
      }, {});
      return Object.values(groupedQuestions).map(genreQuestions => genreQuestions[Math.floor(Math.random() * genreQuestions.length)]);
    };

    return {
      part1: selectRandomQuestion(data.part1),
      part2: selectRandomQuestion(data.part2),
      part3: selectRandomQuestion(data.part3),
    };
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
        }
      });
      setAudioBlobs([]);
      setCapturedStream(stream);

      const recorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm' // Use a supported MIME type
      });

      recorder.addEventListener('dataavailable', event => {
        setAudioBlobs(prevBlobs => [...prevBlobs, event.data]);
      });

      recorder.start();
      mediaRecorderSingleton.setMediaRecorder(recorder);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    return new Promise(resolve => {
      const mediaRecorder = mediaRecorderSingleton.getMediaRecorder();
      if (!mediaRecorder) {
        resolve(null);
        return;
      }

      mediaRecorder.addEventListener('stop', () => {
        const mimeType = mediaRecorder.mimeType;
        const audioBlob = new Blob(audioBlobs, { type: mimeType });
        console.log("MIME type of recorded audio:", mimeType);

        if (capturedStream) {
          capturedStream.getTracks().forEach(track => track.stop());
        }

        mediaRecorderSingleton.clearMediaRecorder();
        resolve(audioBlob);
      });

      mediaRecorder.stop();
    });
  };

  const handleRecordClick = async (question) => {
    if (isRecording) {
      toast({
        title: "Recording in Progress",
        description: "Please wait until the current recording is completed.",
        status: "warning"
      });
      return;
    }

    if (completedRecordings.includes(question.id)) {
      toast({
        title: "Recording Already Completed",
        description: "You have already completed recording for this question.",
        status: "info"
      });
      return;
    }

    setIsRecording(true);
    setIsPaused(false);
    setRecording(question);
    setTimeLeft(question.time_limit);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    await startRecording();
  };

  const handleStopRecording = async () => {
    const audioBlob = await stopRecording();
    clearInterval(timerRef.current);
    setIsRecording(false);
    setIsPaused(false);
    setCompletedRecordings((prev) => [...prev, recording?.id]);
    if (audioBlob) {
      setRecordedBlobs((prev) => ({ ...prev, [recording?.id]: { blobUrl: URL.createObjectURL(audioBlob), blob: audioBlob } }));
    }
    setRecording(null);
  
    // Send audio to the server for transcription
    const formData = new FormData();
    formData.append('audio', audioBlob);
  
    try {
      const response = await fetch('http://localhost:3000/audio/process-audio', {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        const data = await response.json();
        setRecordedTexts((prev) => ({ ...prev, [recording?.id]: data.transcription }));
        toast({
          title: "Transcription Completed",
          description: "Your audio has been transcribed.",
          status: "success"
        });
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to process audio: ${error.message}`,
        status: 'error'
      });
    }
  };
  

  const handlePauseRecording = () => {
    clearInterval(timerRef.current);
    setIsPaused(true);
    const mediaRecorder = mediaRecorderSingleton.getMediaRecorder();
    mediaRecorder.pause();
  };

  const handleResumeRecording = () => {
    setIsPaused(false);
    const mediaRecorder = mediaRecorderSingleton.getMediaRecorder();
    mediaRecorder.resume();
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
  };

  const handleSubmitAll = async () => {
    const submissions = Object.keys(recordedTexts).map(id => ({
      question: getQuestionById(id),
      transcription: recordedTexts[id]
    }));

    try {
      const response = await fetch('http://localhost:3000/grading/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissions)
      });

      if (response.ok) {
        toast({
          title: "Recordings Submitted",
          description: "All your recordings have been submitted for grading.",
          status: "success"
        });
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to submit recordings: ${error.message}`,
        status: 'error'
      });
    }
  };

  const getQuestionById = (id) => {
    for (const part of Object.values(questions)) {
      for (const question of part) {
        if (question.id === id) {
          return question;
        }
      }
    }
    return null;
  };

  const renderQuestions = (questions, part) => {
    if (!questions[part] || questions[part].length === 0) {
      return <p>No questions available for this section.</p>;
    }
    return questions[part].map((question, index) => (
      <div key={question.id}>
        <Toaster />
        <h3 className="text-base font-semibold mb-2">Question {index + 1}</h3>
        <div className="flex flex-col gap-2">
          <p className="text-sm">{question.question}</p>
          <div className="bg-muted rounded-md p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Record your response</span>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-xs">Time limit: {question.time_limit}s</span>
                <button
                  className={`bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary ${isRecording && recording?.id !== question.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handleRecordClick(question)}
                  disabled={isRecording && recording?.id !== question.id}
                >
                  {completedRecordings.includes(question.id) ? '✓' : isRecording && recording?.id === question.id ? 'Recording...' : 'Record'}
                </button>
                {isRecording && recording?.id === question.id && (
                  <>
                    {!isPaused ? (
                      <button
                        className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90 focus:outline-none focus:ring-1 focus:ring-secondary"
                        onClick={handlePauseRecording}
                      >
                        Pause
                      </button>
                    ) : (
                      <button
                        className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90 focus:outline-none focus:ring-1 focus:ring-secondary"
                        onClick={handleResumeRecording}
                      >
                        Resume
                      </button>
                    )}
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-red-500"
                      onClick={handleStopRecording}
                    >
                      Stop
                    </button>
                  </>
                )}
              </div>
            </div>
            {isRecording && recording?.id === question.id && (
              <div className="mt-4">
                <Progress value={(timeLeft / question.time_limit) * 100} aria-label="Recording progress" />
                <p className="text-center mt-2 text-sm">{timeLeft} seconds left</p>
              </div>
            )}
          </div>
          {recordedTexts[question.id] && (
            <div className="mt-4 bg-gray-100 p-4 rounded-md">
              <h4 className="text-sm font-semibold">Transcription:</h4>
              <p className="text-sm">{recordedTexts[question.id]}</p>
            </div>
          )}
        </div>
      </div>
    ));
  };

  const allRecordingsCompleted = Object.keys(questions).reduce((acc, part) => acc + questions[part].length, 0) === completedRecordings.length;

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl font-bold mb-6">IELTS Speaking Exam</h1>
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold mb-4">Part 1</h2>
            <div className="space-y-4">
              {renderQuestions(questions, 'part1')}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">Part 2</h2>
            <div className="space-y-4">
              {renderQuestions(questions, 'part2')}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">Part 3</h2>
            <div className="space-y-4">
              {renderQuestions(questions, 'part3')}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Button 
            className="w-full sm:w-auto" 
            onClick={handleSubmitAll} 
            disabled={!allRecordingsCompleted}
          >
            Submit All Recordings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpeakingPractice;