const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST, // 'localhost'
    port: process.env.DB_PORT, // 3306 || 8889
    user: process.env.DB_USER, // 'root'
    password: process.env.DB_PASS,  // 'root'
    database: process.env.DB_NAME   // 'employees'
});

module.exports = connection;