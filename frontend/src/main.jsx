import React from 'react';
import { createRoot } from 'react-dom/client'; // Step 1: Import createRoot
import App from './App';
import '../app/globals.css';

const container = document.getElementById('root');
const root = createRoot(container); // Step 2: Use createRoot
root.render( // Step 3: Call root.render
  <React.StrictMode>
    <App />
  </React.StrictMode>
);