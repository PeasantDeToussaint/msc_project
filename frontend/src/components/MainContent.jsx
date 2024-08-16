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
import WritingPracticeTask1 from '../components/WritingPracticeTask1';
import WritingPracticeTask2Intro from '../components/WritingPracticeTask2Intro';
import WritingPracticeTask1Intro from '../components/WritingPracticeTask1Intro';
import WritingPracticeTask2 from '../components/WritingPracticeTask2Practice';
import WritingPracticeTask2Feedback from '../components/WritingPracticeTask2Feedback';
import ManageTestbank from '../components/ManageTestbank';
import WritingPracticeTask1Feedback from '../components/WritingPracticeTask1Feedback';
import SpeakingPracticeFeedback from '../components/SpeakingPracticeFeedback';
import UserPage from '../components/UserPageComponents/UserPage';
import VocabularyStatistics from '../components/UserPageComponents/VocabularyStatistics';
import { useAuth } from '../context/authContext';


function MainContent() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const showNavigation = !['/LoginPage', '/RegisterPage'].includes(location.pathname);

  return (
    <div className="flex flex-col h-screen">
      {showNavigation && <Navigation />} {/* Conditionally render the navigation */}
      <div className="flex-grow p-4 overflow-auto h-screen">
        <Routes>
          <Route path="/LoginPage" element={isAuthenticated ? <Navigate replace to="/Homepage" /> : <LoginPage />} />
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
          <Route path="/WritingPracticeTask1" element={isAuthenticated ? <WritingPracticeTask1/> : <Navigate replace to="/LoginPage"/>}/>
          <Route path="/WritingPracticeTask2Feedback" element={isAuthenticated ? <WritingPracticeTask2Feedback/> : <Navigate replace to="/LoginPage"/>}/>
          <Route path="/WritingPracticeTask1Feedback" element={isAuthenticated ? <WritingPracticeTask1Feedback/> : <Navigate replace to="/LoginPage"/>}/>
          <Route path="/ManageTestbank" element={isAuthenticated ? <ManageTestbank/> : <Navigate replace to="/LoginPage"/>}/>
          <Route path="/SpeakingPracticeFeedback" element={isAuthenticated?<SpeakingPracticeFeedback/> : <Navigate replace to="/LoginPage"/>}/>
          <Route path="/VocabularyStatistics" element={isAuthenticated?<VocabularyStatistics/> : <Navigate replace to="/LoginPage"/>}/>
          <Route path="/UserPage" element={isAuthenticated?<UserPage/> : <Navigate replace to="/LoginPage"/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default MainContent;
