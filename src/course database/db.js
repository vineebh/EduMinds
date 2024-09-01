// Load environment variables from a .env file
require('dotenv').config();
const mysql = require('mysql2');

// Create a connection pool to the database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10 // Adjust the connection limit as needed
});

// Export the pool for use in other modules
module.exports = pool.promise(); // Using promise-based API
