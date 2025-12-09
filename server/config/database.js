import { Pool } from 'pg';

// Database Configuration
const dbConfig = {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || '001_initial_schema',
    password: process.env.DB_PASSWORD || 'tanu',
    port: parseInt(process.env.DB_PORT || '5432'),
};

// Create connection pool (singleton)
const pool = new Pool(dbConfig);

// Test connection on startup
pool.on('connect', () => {
    console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('Unexpected database error:', err);
    process.exit(-1);
});

export default pool;
