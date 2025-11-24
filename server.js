const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const landlordRoutes = require('./routes/landlordRoutes');
const tenantRoutes = require('./routes/tenantRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const unitRoutes = require('./routes/unitRoutes');
const rentalAgreementRoutes = require('./routes/rentalAgreementRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const utilityRoutes = require('./routes/utilityRoutes');
const announcementRoutes = require('./routes/announcementRoutes');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/landlord', landlordRoutes);
app.use('/api/tenant', tenantRoutes);
app.use('/api/property', propertyRoutes);
app.use('/api/unit', unitRoutes); 
app.use('/api/rental_agreement', rentalAgreementRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/utility', utilityRoutes);
app.use('/api/announcement', announcementRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
