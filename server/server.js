import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';

// IMPORTING ROUTE MODULES
import LandlordRoutes from './routes/LandlordRoutes.js';
import TenantRoutes from './routes/TenantRoutes.js';
import PropertyRoutes from './routes/PropertyRoutes.js';
import UnitRoutes from './routes/UnitRoutes.js';
import PaymentRoutes from './routes/PaymentRoutes.js';
import UtilityRoutes from './routes/UtilityRoutes.js';
import RentalAgreementRoutes from './routes/RentalAgreementRoutes.js';
import AnnouncementRoutes from './routes/AnnouncementRoutes.js';

const app = express();
const port = 3001;

// Middleware
app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(express.json());

// Database connection pool for test route
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: '001_initial_schema',
    password: 'tanu',
    port: 5432,
});

// Health check / Test Route
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.status(200).json({
            status: 'Database Connected',
            currentTime: result.rows[0].now,
            message: 'Backend is connected to PostgreSQL successfully!'
        });
    } catch (err) {
        console.error('Error connecting to PostgreSQL:', err.message);
        res.status(500).json({
            status: 'Database Error',
            message: 'Could not connect to PostgreSQL. Check credentials and server status.'
        });
    }
});

// API Routes
app.use('/api/landlords', LandlordRoutes);
app.use('/api/tenants', TenantRoutes);
app.use('/api/properties', PropertyRoutes);
app.use('/api/units', UnitRoutes);
app.use('/api/payments', PaymentRoutes);
app.use('/api/utilities', UtilityRoutes);
app.use('/api/rental-agreements', RentalAgreementRoutes);
app.use('/api/announcements', AnnouncementRoutes);

// Start the server
app.listen(port, () => {
    console.log(`RentEase Backend running at http://localhost:${port}`);
});