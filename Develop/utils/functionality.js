const connection = require('../connection');
const chalk = require('chalk');
const inquirer = require('inquirer');
const questions = require('./questions');


viewAllDepartments = async () => {
    const res = await connection.query(`SELECT * FROM department`)
    console.table(res);
};

viewAllRoles = async () => {
    const res = await connection.query(`SELECT * FROM role`)
    console.table(res);
}

viewAllEmployees = async () => {
    const res = await connection.query(`SELECT * FROM employee`)
    console.table(res);
}

addDepartment = async (answer) => {
    try {
        await inquirer.prompt(questions.departmentQuestions);
        await connection.query(`INSERT INTO department (name) VALUES ('${answer.departmentName}')`)
        console.log(chalk.green(`Department ${answer.departmentName} added successfully!`));  
    } 
    catch (err) {
        console.log(chalk.redBright(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, err));
    }
}

addRole = async (answer) => {
    try {
        await inquirer.prompt(questions.roleQuestions);
        await connection.query(`SELECT name, id FROM department`)
    } catch (err) {
        console.log(chalk.redBright(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, err));
    }    
}

module.exports = {
    viewAllDepartments, 
    viewAllRoles, 
    viewAllEmployees, 
    addDepartment
};

