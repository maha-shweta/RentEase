# RentEase Backend

Express.js backend API for the RentEase property management platform.

## Structure

```
backend/
├── config/         # Configuration files
│   └── database.js # PostgreSQL connection pool
├── controllers/    # Request handlers
├── models/         # Database models
├── routes/         # API route definitions
└── server.js       # Application entry point
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure database in `config/database.js` or use environment variables:
   - `DB_USER` (default: postgres)
   - `DB_HOST` (default: localhost)
   - `DB_NAME` (default: Landlord)
   - `DB_PASSWORD` (default: 12345)
   - `DB_PORT` (default: 5432)

3. Run migrations from `../db/migrations/`

4. Start server:
   ```bash
   node server.js
   ```

Server runs at http://localhost:3001

## API Endpoints

| Route | Description |
|-------|-------------|
| `/api/landlords` | Landlord auth & profile |
| `/api/tenants` | Tenant management |
| `/api/properties` | Property CRUD |
| `/api/units` | Unit management |
| `/api/payments` | Payment records |
| `/api/utilities` | Utility bills |
| `/api/rental-agreements` | Lease management |
| `/api/announcements` | Announcements |
