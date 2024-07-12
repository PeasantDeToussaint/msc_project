import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import ReadingPractice from "../components/ReadingPractice";
import ListeningPractice from '../components/ListeningPractice';
import SpeakingPractice from '../components/SpeakingPractice';
import WritingPractice from './WritingPracticeTask1Intro';
import About from '../components/About';
import Homepage from '../components/Homepage';
import RegisterPage from '../components/RegisterPage';
import ContactPage from '../components/ContactPage';
import LoginPage from '../components/LoginPage';
import SpeakingPracticeIntro from '../components/SpeakingPracticeIntro';
import SpeakingPracticeRandom from '../components/SpeakingPracticeRandom';
import Navigation from '../components/Navigation'; 
import WritingPracticeIntro from '../components/WritingPracticeIntro';
import WritingPracticeTask2Intro from '../components/WritingPracticeTask2Intro';
import WritingPracticeTask1Intro from '../components/WritingPracticeTask1Intro';
import WritingPracticeTask2 from '../components/WritingPracticeTask2Practice';

function MainContent({ isAuthenticated, setIsAuthenticated }) {
  const location = useLocation();
  const showNavigation = !['/LoginPage', '/RegisterPage'].includes(location.pathname);

  return (
    <div className="flex flex-col h-screen">
      {showNavigation && <Navigation isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} {/* Conditionally render the navigation */}
      <div className="flex-grow p-4 overflow-auto h-screen">
        <Routes>
          <Route path="/LoginPage" element={<LoginPage isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/Homepage" element={isAuthenticated ? <Homepage /> : <Navigate replace to="/LoginPage" />} />
          <Route path="/RegisterPage" element={<RegisterPage />} />
          <Route path="/" element={isAuthenticated ? <Homepage /> : <Navigate replace to="/LoginPage" />} />
          <Route path="/reading-practice" element={isAuthenticated ? <ReadingPractice /> : <Navigate replace to="/LoginPage" />} />
          <Route path="/listening-practice" element={isAuthenticated ? <ListeningPractice /> : <Navigate replace to="/LoginPage" />} />
          <Route path="/SpeakingPractice" element={isAuthenticated ? <SpeakingPractice /> : <Navigate replace to="/LoginPage" />} />
          <Route path="/writing-practice" element={isAuthenticated ? <WritingPractice /> : <Navigate replace to="/LoginPage" />} />
          <Route path="/about" element={isAuthenticated ? <About /> : <Navigate replace to="/LoginPage" />} />
          <Route path="/contact" element={isAuthenticated ? <ContactPage /> : <Navigate replace to="/LoginPage" />} />
          <Route path="/SpeakingPracticeIntro" element={isAuthenticated ? <SpeakingPracticeIntro /> : <Navigate replace to="/LoginPage" />} />
          <Route path="/SpeakingPracticeRandom" element={isAuthenticated ? <SpeakingPracticeRandom /> : <Navigate replace to="/LoginPage" />} />
          <Route path="/WritingPracticeIntro" element={isAuthenticated ? <WritingPracticeIntro /> : <Navigate replace to="/LoginPage"/>} />
          <Route path="/WritingPracticeTask1Intro" element={isAuthenticated ? <WritingPracticeTask1Intro/> : <Navigate replace to="/LoginPage"/>}/>
          <Route path="/WritingPracticeTask2Intro" element={isAuthenticated ? <WritingPracticeTask2Intro/> : <Navigate replace to="/LoginPage"/>}/>
          <Route path="/WritingPracticeTask2" element={isAuthenticated ? <WritingPracticeTask2/> : <Navigate replace to="/LoginPage"/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default MainContent;
