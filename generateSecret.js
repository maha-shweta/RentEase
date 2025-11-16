// generateSecret.js
const crypto = require('crypto');

// Generate a secure, random JWT secret (64 bytes)
const jwtSecret = crypto.randomBytes(64).toString('hex');
console.log("Your JWT Secret: ", jwtSecret);
