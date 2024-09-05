import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BASE_URL || `http://localhost:${import.meta.env.VITE_ALLOCATED_PORT}`;


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    return !!token;
  });
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuthentication = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsAuthenticated(false);
          return;
        }

        const res = await fetch(`${BASE_URL}/authentication/verify`, {
          method: "POST",
          headers: { 
            'Authorization': `Bearer ${token}`
          }
        });


        if (!res.ok) {
          throw new Error('Verification failed');
        }

        const parseRes = await res.json();
        setIsAuthenticated(parseRes.valid);

      } catch (err) {
        console.error('Authentication error:', err.message);
        setIsAuthenticated(false);
      }
    };

    verifyAuthentication();
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/LoginPage');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
