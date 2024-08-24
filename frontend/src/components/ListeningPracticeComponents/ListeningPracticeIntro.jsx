import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated, config } from 'react-spring';
import { Headphones, Play, Users, Building, GraduationCap, Presentation } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

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
    <div className="absolute inset-0 overflow-hidden">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#DB2777" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#gradient)" opacity="0.3" />
      </svg>
      <FloatingObject delay={0} style={{ top: '10%', left: '10%' }} />
      <FloatingObject delay={500} style={{ top: '20%', right: '20%' }} />
      <FloatingObject delay={1000} style={{ bottom: '15%', left: '30%' }} />
      <FloatingObject delay={1500} style={{ bottom: '25%', right: '15%' }} />
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  const springProps = useSpring({
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    config: config.wobbly,
  });

  return (
    <animated.div
      style={springProps}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-4 flex items-start space-x-4 shadow-md"
    >
      <Icon className="h-6 w-6 text-indigo-600 flex-shrink-0" />
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </animated.div>
  );
};

export default function Component() {
  const [selectedTest, setSelectedTest] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [availableTests, setAvailableTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvailableTests = async () => {
      try {
        const response = await fetch('http://localhost:3000/listeningQuestions/availableTest');
        if (!response.ok) {
          throw new Error('Failed to fetch available tests');
        }
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
      if (selectedTest) {
        navigate(`/ListeningPractice/${selectedTest}`);
      }
    }, 1000);
  };

  const headerAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.molasses,
  });

  const cardAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.molasses,
  });

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <div className="w-full max-w-4xl space-y-12 relative z-10">
        <animated.div style={headerAnimation} className="text-center">
          <Headphones className="mx-auto h-16 w-16 text-indigo-600" />
          <h1 className="mt-6 text-4xl font-extrabold text-white">Listening Practice</h1>
          <p className="mt-2 text-xl text-gray-200">
            Enhance your listening skills with our test materials
          </p>
        </animated.div>

        <animated.div style={cardAnimation}>
          <Card className="bg-white bg-opacity-80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>What are the four parts of IELTS listening about?</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FeatureCard 
                icon={Users} 
                title="Part 1: Social Needs" 
                description="Assess your ability to understand everyday conversations and extract specific information"
              />
              <FeatureCard 
                icon={Building} 
                title="Part 2: Social Context" 
                description="Evaluate your comprehension of spoken descriptions about everyday situations or services"
              />
              <FeatureCard 
                icon={GraduationCap} 
                title="Part 3: Educational Context" 
                description="Test your ability to follow discussions and conversations related to educational settings"
              />
              <FeatureCard 
                icon={Presentation} 
                title="Part 4: Academic Subject" 
                description="Measure your capacity to comprehend and analyze academic lectures or presentations"
              />
            </CardContent>
          </Card>
        </animated.div>

        <animated.div style={cardAnimation}>
          <Card className="bg-white bg-opacity-80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Start Practice</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Select a test from the options below to begin your practice session. Each test covers all four sections of the IELTS Listening exam.
              </p>
              <div className="flex items-center space-x-4">
                <Select onValueChange={setSelectedTest}>
                  <SelectTrigger className="w-[200px]">
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
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Play className="mr-2 h-4 w-4" />
                  {isLoading ? 'Loading...' : 'Start Practice'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </animated.div>
      </div>
    </div>
  );
}