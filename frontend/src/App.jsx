import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ReadingPractice from './components/ReadingPractice';
import ListeningPractice from './components/ListeningPractice';
import SpeakingPractice from './components/SpeakingPractice';
import WritingPractice from './components/WritingPractice';
import ExamSimulation from './components/ExamSimulation';
import About from './components/About';
import UserRanking from './components/UserRanking';
import Homepage from './components/Homepage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';

function MainContent({ isAuthenticated, setIsAuthenticated }) {
  return (
    <div className="flex-grow p-4 overflow-auto h-screen">
      <Routes>
        <Route path="/LoginPage" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/Homepage" element={isAuthenticated ? <Homepage /> : <Navigate replace to="/LoginPage" />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/" element={isAuthenticated ? <Homepage /> : <Navigate replace to="/LoginPage" />} />
        <Route path="/reading-practice" element={isAuthenticated ? <ReadingPractice /> : <Navigate replace to="/LoginPage" />} />
        <Route path="/listening-practice" element={isAuthenticated ? <ListeningPractice /> : <Navigate replace to="/LoginPage" />} />
        <Route path="/speaking-practice" element={isAuthenticated ? <SpeakingPractice /> : <Navigate replace to="/LoginPage" />} />
        <Route path="/writing-practice" element={isAuthenticated ? <WritingPractice /> : <Navigate replace to="/LoginPage" />} />
        <Route path="/exam-simulation" element={isAuthenticated ? <ExamSimulation /> : <Navigate replace to="/LoginPage" />} />
        <Route path="/about" element={isAuthenticated ? <About /> : <Navigate replace to="/LoginPage" />} />
        <Route path="/user-ranking" element={isAuthenticated ? <UserRanking /> : <Navigate replace to="/LoginPage" />} />
      </Routes>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    return !!token;
  });

  useEffect(() => {
    const verifyAuthentication = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsAuthenticated(false);
          return;
        }

        const res = await fetch("http://localhost:3000/authentication/verify", {
          method: "POST",
          headers: { 
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error('Verification failed');
        }

        const parseRes = await res.json();
        console.log('Verification response:', parseRes); // Debugging line
        setIsAuthenticated(parseRes.valid);

      } catch (err) {
        console.error('Authentication error:', err.message);
        setIsAuthenticated(false); // Ensure state is updated on error
      }
    };

    verifyAuthentication();
  }, []);

  return (
    <Router>
      <MainContent 
        isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated} 
      />
    </Router>
  );
}

export default App;
