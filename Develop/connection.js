const mysql = require('mysql2');
const startApp = require('./start');
// require('dotenv').config();

//to connect to the database
const connection = mysql.createConnection({
    host: 'localhost', //  process.env.DB_HOST
    port: 8889 || 3306, // process.env.DB_PORT,
    user: 'root', //  process.env.DB_USER
    password: 'root',  // process.env.DB_PASSWORD
    database: 'employees'//  process.env.DB_NAME   
});

//once it connects, it will run the connectionLog function or it will throw an error
connection.connect (err => {
    if (err) throw err;
    console.log(`Connected to ${process.env.DB_NAME} database`);
    connectionLog();
});

connectionLog = () => {
  console.log("✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨")
  console.log("✨                              ✨")
  console.log("✨            WELCOME           ✨")
  console.log("✨              TO              ✨")
  console.log("✨         YOUR EMPLOYEE        ✨")
  console.log("✨       MANAGEMENT SYSTEM      ✨")
  console.log("✨                              ✨")
  console.log("✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨")
  startApp();
}

module.exports = connection;