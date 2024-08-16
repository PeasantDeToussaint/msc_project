import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Feedback() {
  const location = useLocation();
  const { prompt, response } = location.state || {};

  const [feedback, setFeedback] = useState({
    overallScore: 'N/A',
    sections: [
      { title: 'Task Response', score: 'N/A', text: 'No feedback available' },
      { title: 'Coherence and Cohesion', score: 'N/A', text: 'No feedback available' },
      { title: 'Lexical Resource', score: 'N/A', text: 'No feedback available' },
      { title: 'Grammatical Range and Accuracy', score: 'N/A', text: 'No feedback available' },
    ],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetchedFeedback = useRef(false);

  useEffect(() => {
    if (prompt && response && !hasFetchedFeedback.current) {
      setLoading(true);
      hasFetchedFeedback.current = true; // Ensure we only fetch feedback once

      const token = localStorage.getItem('token');
      console.log("token is like this:", token);

      fetch('http://localhost:3000/essay/processEssay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'jwt_token': `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt, response }),
      })
        .then((res) => res.json())
        .then((data) => {
          const parsedFeedback = parseFeedback(data);
          setFeedback(parsedFeedback);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching feedback:', err);
          setError('Failed to fetch feedback. Please try again later.');
          setLoading(false);
        });
    }
  }, [prompt, response]);

  const parseFeedback = (data) => {
    return {
      overallScore: data.overallScore || 'N/A',
      sections: [
        {
          title: 'Task Response',
          score: data.taskResponse?.score || 'N/A',
          text: data.taskResponse?.text || 'No feedback available',
        },
        {
          title: 'Coherence and Cohesion',
          score: data.coherence?.score || 'N/A',
          text: data.coherence?.text || 'No feedback available',
        },
        {
          title: 'Lexical Resource',
          score: data.lexical?.score || 'N/A',
          text: data.lexical?.text || 'No feedback available',
        },
        {
          title: 'Grammatical Range and Accuracy',
          score: data.grammar?.score || 'N/A',
          text: data.grammar?.text || 'No feedback available',
        },
      ],
    };
  };

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
          <div className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground">Overall Score</div>
            <div className="text-2xl font-bold">{feedback.overallScore}</div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {feedback.sections.map((section, index) => (
          <Card className="w-full" key={index}>
            <CardHeader>
              <CardTitle className="text-base font-bold">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <p className="text-muted-foreground">{section.text}</p>
                <div className="text-right">
                  <div className="text-xl font-bold">{section.score}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link
          to="/WritingPracticeTask2Intro"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Return
        </Link>
      </div>
    </div>
  );
}