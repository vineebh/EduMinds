const mysql = require('mysql2');
require('dotenv').config();

// Create a connection
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password:process.env.DB_PASS,
    port:process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.message);

    } else {
        console.log('Database connected successfully');
        connection.release();
    }
});


module.exports = pool.promise();