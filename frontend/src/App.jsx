import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainContent from './components/MainContent';
import { AuthProvider } from './context/authContext';
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <Router>
      <Toaster position="bottom-right" />
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
