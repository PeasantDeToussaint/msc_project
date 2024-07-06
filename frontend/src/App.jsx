import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainContent from './components/MainContent';

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
