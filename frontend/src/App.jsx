import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainContent from './components/MainContent';
import { AuthProvider } from './context/authContext';
import { Toaster } from "@/components/ui/toaster";
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Toaster position="bottom-right" />
        <AuthProvider>
          <MainContent />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;