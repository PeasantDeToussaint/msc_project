const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// Route for serving frontend
app.get('*', (req, res) => {
  if (req.url.startsWith('/static') || req.url.endsWith('.js') || req.url.endsWith('.css') || req.url.endsWith('.map')) {
    res.sendFile(path.join(__dirname, '../../frontend/dist', req.url));
  } else {
    res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
  }
});

// Start the server
const PORT = process.env.PORT || 0; // Use Heroku's port or default to 0 for local development

const server = app.listen(PORT, () => {
  const allocatedPort = server.address().port;
  console.log(`Server running on port ${allocatedPort}`);
  process.env.ALLOCATED_PORT = allocatedPort;
});

// Endpoint to get the allocated port (for local development)
if (process.env.NODE_ENV !== 'production') {
  app.get('/port', (req, res) => {
    res.json({ port: process.env.ALLOCATED_PORT });
  });
}
