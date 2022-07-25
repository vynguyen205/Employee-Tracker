const connection = require('../connection');
const chalk = require('chalk');
const inquirer = require('inquirer');
const questions = require('./questions');
// const run = require('nodemon/lib/monitor/run');


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
        console.log(chalk.green(`✨${answers.departmentName} department added successfully!✨\n`));  
    } 
    catch (err) {
        console.log(chalk.redBright(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, err));
    }
}

addRole = async () => {
    try {
        //destructuring the department array to get the department id and name
        const [department] = await connection.promise().query(`SELECT * FROM department`);
        //loop through the department and create a new array of department choices
        const departmentChoices = department.map(department => {
            return {
                name: department.name,
                value: department.id
            }
        });
        
        const departmentPick = await inquirer.prompt ([
            {
                type: 'list',
                name: "nameDepartment",
                message: "Please choose the department this role belongs to.",
                choices: departmentChoices
            },
        ])
        //move this later
        const answer = await inquirer.prompt(questions.roleQuestions);
        const answersParams = [answer.roleTitle, answer.salary, departmentPick.nameDepartment];
        await connection.promise().query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, answersParams)
        console.log(chalk.green(`✨New Role: ${answer.roleTitle} added successfully!✨\n`));  

    } catch (err) {
        console.log(chalk.redBright(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, err));
    }    
}

addEmployee = async () => {
    try{
        //destructuring the role array to get the role title and dapartment id
        const [roles] = await connection.promise().query(`SELECT title, department_id FROM role`);
        //loop through the roles and create a new array of role choices
        const roleChoices = roles.map(role => {
            return {
                name: role.title,
                value: role.department_id
            }
        });

        //destructuring the employee array to get the manager_id and name
        const [employees] = await connection.promise().query(`SELECT manager_id, first_name, last_name FROM employee`);
        //loop through the employees and create a new array of employee choices
        const managerChoices = employees.map(manager => {
            return {
                name: `${manager.first_name} ${manager.last_name}`,
                value: manager.manager_id
            }
        });
        
        const employeePick = await inquirer.prompt ([
            {
                type: 'list',
                name: 'employeeRole',
                message: 'Select role of the employee.',
                choices: roleChoices
            },
            {
                type: 'input',
                name: 'managerID',
                message: `Please select Employee's Manager:`,
                choices: managerChoices
                
            },
        ])
        const answers = await inquirer.prompt(questions.employeeQuestions);
        //create an array of answers to pass to the query
        const answersParams = [answers.firstName, answers.lastName, employeePick.employeeRole, employeePick.managerID];
        //insert the new employee into the database
        await connection.promise().query(`INSERT INTO department (name) VALUES (?, ?, ?, ?)`, answersParams)
        console.log(chalk.green(`✨${answers.firstName} ${answers.lastName} department added successfully!✨\n`));  
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

