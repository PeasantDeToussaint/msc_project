import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSpring, animated, config } from 'react-spring';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

const FloatingObject = ({ delay, style }) => {
  const props = useSpring({
    loop: true,
    from: { transform: 'translate3d(0,0px,0)' },
    to: [
      { transform: 'translate3d(0,20px,0)' },
      { transform: 'translate3d(0,-20px,0)' },
    ],
    config: {
      duration: 2000 + delay,
    },
  });

  return (
    <animated.div
      style={{
        ...props,
        ...style,
        position: 'absolute',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
      }}
    />
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-20" />
      <FloatingObject delay={0} style={{ top: '10%', left: '10%' }} />
      <FloatingObject delay={500} style={{ top: '20%', right: '20%' }} />
      <FloatingObject delay={1000} style={{ bottom: '15%', left: '30%' }} />
      <FloatingObject delay={1500} style={{ bottom: '25%', right: '15%' }} />
    </div>
  );
};

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
      hasFetchedFeedback.current = true;

      const token = localStorage.getItem('token');
      console.log("token is like this:", token);

      fetch('http://localhost:3000/essay/processEssay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
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

  const contentAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.molasses,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="container mx-auto max-w-4xl py-12">{error}</div>;
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <animated.div style={contentAnimation} className="max-w-4xl mx-auto space-y-8 relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Feedback on your essay</h1>
          
          <Card className="mb-8 bg-indigo-50">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-indigo-900">Overall Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-indigo-600">{feedback.overallScore}</div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {feedback.sections.map((section, index) => (
              <Card key={index} className="w-full">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-start">
                    <p className="text-gray-600 flex-grow pr-4">{section.text}</p>
                    <div className="text-2xl font-bold text-indigo-600">{section.score}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Link to="/WritingPracticeTask2Intro">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Return to Practice
              </Button>
            </Link>
          </div>
        </div>
      </animated.div>
    </div>
  );
}