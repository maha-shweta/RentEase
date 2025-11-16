const { Pool } = require('pg');  // Import PostgreSQL client
require('dotenv').config();  // Load environment variables from .env file

// Set up the PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,  // PostgreSQL user (from .env)
  host: process.env.DB_HOST,  // e.g., localhost
  database: process.env.DB_NAME,  // Database name (from .env)
  password: process.env.DB_PASSWORD,  // Database password (from .env)
  port: process.env.DB_PORT,  // PostgreSQL port (default is 5432)
});

// Function to execute raw SQL queries
const query = (text, params) => {
  return pool.query(text, params);  // Executes raw SQL queries
};

module.exports = { query };  // Export the query function for use in other files
