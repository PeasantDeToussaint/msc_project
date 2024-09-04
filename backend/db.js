import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config(); 

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // Use DATABASE_URL from environment
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false // Enable SSL in production
});

export default pool;