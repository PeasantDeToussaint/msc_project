import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FeedbackTask1() {
  const location = useLocation();
  const { prompt, response, image_url } = location.state || {};

  const [feedback, setFeedback] = useState({
    overallScore: 'N/A',
    taskResponse: { score: 'N/A', text: 'No feedback available' },
    coherence: { score: 'N/A', text: 'No feedback available' },
    lexical: { score: 'N/A', text: 'No feedback available' },
    grammar: { score: 'N/A', text: 'No feedback available' },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetchedFeedback = useRef(false);

  useEffect(() => {
    if (prompt && response && image_url && !hasFetchedFeedback.current) {
      setLoading(true);
      hasFetchedFeedback.current = true;

      const formData = new FormData();
      formData.append('prompt', prompt);
      formData.append('response', response);
      formData.append('image', image_url);

      fetch('http://localhost:3000/essayTask1/processTask1', {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setFeedback(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching feedback:', err);
          setError('Failed to fetch feedback. Please try again later.');
          setLoading(false);
        });
    }
  }, [prompt, response, image_url]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return <div className="container mx-auto max-w-4xl py-12">{error}</div>;
  }

  return (
    <div className="container mx-auto max-w-4xl py-12">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Feedback on your essay:</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground">Overall Score</div>
              <div className="text-2xl font-bold">{feedback.overallScore}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-base font-bold">Task Response</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-muted-foreground">{feedback.taskResponse.text}</p>
              <div className="text-right">
                <div className="text-xl font-bold">{feedback.taskResponse.score}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-base font-bold">Coherence and Cohesion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-muted-foreground">{feedback.coherence.text}</p>
              <div className="text-right">
                <div className="text-xl font-bold">{feedback.coherence.score}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-base font-bold">Lexical Resource</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-muted-foreground">{feedback.lexical.text}</p>
              <div className="text-right">
                <div className="text-xl font-bold">{feedback.lexical.score}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-base font-bold">Grammatical Range and Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-muted-foreground">{feedback.grammar.text}</p>
              <div className="text-right">
                <div className="text-xl font-bold">{feedback.grammar.score}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-8">
          <Link to="/WritingPracticeTask1Intro"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Return
          </Link>
        </div>
      </div>
    </div>
  );
}
