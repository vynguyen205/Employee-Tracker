const connection = require('../connection');
const chalk = require('chalk');
const inquirer = require('inquirer');
const questions = require('./questions');
const run = require('nodemon/lib/monitor/run');


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

addDepartment = async () => {
    try {
        const answers =  await inquirer.prompt(questions.departmentQuestions);
        await connection.promise().query(`INSERT INTO department (name) VALUES ('${answers.departmentName}')`)
        console.log(chalk.green(`✨${answers.departmentName} department added successfully!✨`));  
    } 
    catch (err) {
        console.log(chalk.redBright(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, err));
    }
}

addRole = async () => {
    try {
        const department = await connection.promise().query(`SELECT name, id FROM department`);
        const deparmentChoices = department.map(({ name, id }) => ({ name, value: id }));
        
        const departmentPick = await inquirer.prompt ([
            {
                type: 'list',
                name: "nameDepartment",
                message: "Please choose the department this role belongs to.",
                choices: deparmentChoices
            },
        ])
        //move this later
        const answer = await inquirer.prompt(questions.roleQuestions);
        const answersParams = [answer.roleTitle, answer.salary, departmentPick.nameDepartment];
        await connection.promise().query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, answersParams)
    } catch (err) {
        console.log(chalk.redBright(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, err));
    }    
}

addEmployee = async () => {
    try{

        const roles = await connection.promise().query(`SELECT title, department_id FROM role`);
        const roleChoices = roles.map(({ title, id }) => ({ name: title, value: id }));
        
        const employeePick = await inquirer.prompt ([
            {
                type: 'list',
                name: 'employeeRole',
                message: 'Select role of the employee.',
                choices: []
            },
            {
                type: 'input',
                name: 'managerID',
                message: `Please select Employee's Manager:`,
                choices: []
                
            },
        ])
        const answers = await inquirer.prompt(questions.employeeQuestions);
        
        const answersParams = [answers.firstName, answers.lastName, employeePick.employeeRole, employeePick.managerID];
        await connection.promise().query(`INSERT INTO department (name) VALUES (?, ?, ?, ?)`, answersParams)
        console.log(chalk.green(`✨${answers.departmentName} department added successfully!✨`));  
    } 
    catch (err) {
        console.log(chalk.redBright(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, err));
    }
}

module.exports = {
    viewAllDepartments, 
    viewAllRoles, 
    viewAllEmployees, 
    addDepartment,
    addRole,
    addEmployee,
};

