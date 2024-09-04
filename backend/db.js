import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

const { Pool } = pkg;

// Function to configure the pool
const createPool = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  return new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Enable SSL only in production
  });
};

const pool = createPool();

// Optional: Add a test connection function to validate the pool setup
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to the database');
    client.release(); // Release the client back to the pool
  } catch (err) {
    console.error('Database connection error:', err);
  }
};

// Run the test connection if necessary
testConnection();

export default pool;
