const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');  // Import all routes, including tenant and landlord

dotenv.config();  // Load environment variables from .env file
const app = express();

app.use(express.json());  // Middleware to parse incoming JSON requests

// Register the routes for tenants, landlords, and properties
app.use('/api', userRoutes);  // All routes are prefixed with /api

// Start the server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
