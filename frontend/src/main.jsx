import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '../app/globals.css';

const Main = () => {
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // In production, use the environment variable
      setBaseUrl(process.env.BASE_URL);
    } else {
      // In development, fetch the port and construct the URL
      fetch('/port')
        .then(response => response.json())
        .then(data => {
          const port = data.port;
          setBaseUrl(`http://localhost:${port}`);
        })
        .catch(error => console.error('Error fetching port:', error));
    }
  }, []);

  if (!baseUrl) {
    return <div>Loading...</div>;
  }

  return <App baseUrl={baseUrl} />;
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Main />);
