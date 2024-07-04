import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainContent({ isAuthenticated, setIsAuthenticated, isSidebarOpen }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/LoginPage";
  const isRegisterPage = location.pathname === "/RegisterPage";

  return (
    <div className="flex">
      {!isLoginPage && !isRegisterPage && isSidebarOpen && <Sidebar />}
      <div className={`flex-grow p-4 overflow-auto h-screen ${!isLoginPage && !isRegisterPage && isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Routes>
          <Route path="/LoginPage" element={<LoginPage setAuth={setIsAuthenticated} />} />
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
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Check authentication state from local storage on initial load
    const storedAuthState = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(storedAuthState);
  }, []);

  useEffect(() => {
    // Update local storage whenever authentication state changes
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:3000/authentication/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.getItem('token') }
      });

      const parseRes = await res.json();

      setIsAuthenticated(parseRes === true);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <Router>
      <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
      <MainContent 
        isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setAuth} 
        isSidebarOpen={isSidebarOpen} 
      />
    </Router>
  );
}

export default App;