import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Feedback() {
  const location = useLocation();
  const { submissions } = location.state || {};

  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch('/transcription/processTranscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ submissions }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setFeedbacks(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching feedback:', err);
        setError('Failed to fetch feedback. Please try again later.');
        setLoading(false);
      }
    };

    if (submissions && submissions.length > 0) {
      fetchFeedback();
    }
  }, [submissions]);

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
      <div className="space-y-6">
        {feedbacks.map((feedback, index) => (
          <Card className="w-full" key={index}>
            <CardHeader>
              <CardTitle className="text-base font-bold">{feedback.question.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm font-semibold">Your Response:</p>
                <p className="text-sm">{feedback.transcription}</p>
              </div>
              <div className="space-y-2 mt-4">
                <p className="text-sm font-semibold">Feedback:</p>
                <p className="text-sm whitespace-pre-line">{feedback.feedback}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link
          to="/"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
