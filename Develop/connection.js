// const startApp = require('./utils/start');
const mysql = require('mysql2');
const chalk = require('chalk');
const util = require('util');
require('dotenv').config();
//to connect to the database
const connection = mysql.createConnection({
  host:  process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME   
});


//once it connects, it will run the connectionLog function or it will throw an error

// const makeConnection = (cb) => {
//   connection.connect(err => {
//     if (err) throw err;
//     console.log(chalk.greenBright(`\n CONNECTED TO EMPLOYEES DATABASE\n`)); // ${process.env.DB_NAME}
//     connectionLog();
//     cb();
//   });
// }

connection.query = util.promisify(connection.query);
connection.connect = util.promisify(connection.connect);
connection.customLog = () => {
    console.log("✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨")
    console.log("✨                              ✨")
    console.log("✨            WELCOME           ✨")
    console.log("✨              TO              ✨")
    console.log("✨         YOUR EMPLOYEE        ✨")
    console.log("✨       MANAGEMENT SYSTEM      ✨")
    console.log("✨                              ✨")
    console.log("✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨\n");
  }

module.exports = connection;