import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwtAuth from '../routes/jwtAuth.js'; // Adjust the path as necessary
import dashboardRouter from '../routes/dashboard.js'; // Assuming default export

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) =>
{
  res.send('This is the backend page of my project.');
})
// Use routes
app.use("/authentication", jwtAuth);

// Home route
app.use("/dashboard", dashboardRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});