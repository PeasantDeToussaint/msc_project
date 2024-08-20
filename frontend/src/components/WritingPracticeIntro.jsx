import React from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated, config } from 'react-spring';
import { Pen, FileText } from 'lucide-react';

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

const TaskLink = ({ to, title, description, icon: Icon }) => {
  const animation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.molasses,
  });

  return (
    <animated.div style={animation}>
      <Link
        to={to}
        className="block bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm bg-opacity-80 transition-transform hover:scale-105"
      >
        <div className="p-6 md:p-8">
          <Icon className="mx-auto h-12 w-12 text-indigo-600 mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </Link>
    </animated.div>
  );
};

export default function WritingPractice() {
  const headerAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.molasses,
  });

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <div className="w-full max-w-4xl space-y-12 relative z-10">
        <animated.div style={headerAnimation} className="text-center">
          <Pen className="mx-auto h-16 w-16 text-indigo-600" />
          <h2 className="mt-6 text-4xl font-extrabold text-white">Writing Practice</h2>
          <p className="mt-2 text-xl text-gray-200">
            IELTS Writing Test lasts for 60 minutes, and you will need to complete two writing tasks.
          </p>
        </animated.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TaskLink
            to="/WritingPracticeTask1Intro"
            title="Practice Task 1"
            description="Write a report summarizing, describing, or explaining visual information (graphs, charts, tables, etc.) in at least 150 words."
            icon={FileText}
          />
          <TaskLink
            to="/WritingPracticeTask2Intro"
            title="Practice Task 2"
            description="Write an essay responding to a point of view, argument, or problem in at least 250 words."
            icon={FileText}
          />
        </div>
      </div>
    </div>
  );
}