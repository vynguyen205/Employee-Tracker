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

addDepartment = async () => {
    try {
        const answers =  await inquirer.prompt(questions.departmentQuestions);
        await connection.promise().query(`INSERT INTO department (name) VALUES (?)`, answers.departmentName);
        console.log(chalk.green(`✨${answers.departmentName} department added successfully!✨`));  
    } 
    catch (err) {
        console.log(chalk.redBright(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, err));
    }
}

addRole = async () => {
    try {
        //get all departments
        // [dpartment]= gets the array of deparment objects
        const [department] = await connection.promise().query(`SELECT name, id FROM department`);
        const deparmentChoices = department.map(dept => {
            return {
                //dept.name = name of the department
                name: dept.name,
                value: dept.id
            }
        });
        //answers from user
        const answer = await inquirer.prompt(questions.roleQuestions);
        //ask user for role dapartment info
        const departmentPick = await inquirer.prompt ([
            {
                type: 'list',
                name: "nameDepartment",
                message: "Please choose the department this role belongs to.",
                choices: deparmentChoices
            },
        ])
        
        //create answer params for easier readibility;
        const answersParams = [answer.roleTitle, answer.salary, departmentPick.nameDepartment];
        await connection.promise().query
            (`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, 
            answersParams)
        
        console.log(chalk.green(`✨${answer.roleTitle} added successfully!✨`));  

    } catch (err) {
        console.log(chalk.redBright(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, err));
    }    
}

addEmployee = async () => {
    try {
        //get all roles
        const [role] = await connection.promise().query(`SELECT title, department_id FROM role`);
        const roleChoices = role.map(role => {
            return {
                name: role.title,
                value: role.department_id
            }
        })
        
        //get all manager
        const [manager] = await connection.promise().query(`SELECT id, first_name, last_name FROM employee`);
        const employeeChoices = manager.map(manager => {
            return {
                name: `${manager.first_name} ${manager.last_name}`,
                value: manager.id
            }
        })
        
        const answers = await inquirer.prompt(questions.employeeQuestions);
        const employeePick = await inquirer.prompt ([
            {
                type: 'list',
                name: 'employeeRole',
                message: 'Please select role of the employee.',
                choices: roleChoices
            },
            {
                type: 'list',
                name: 'managerID',
                message: `Please select Employee's Manager:`,
                choices: [...employeeChoices, {name: 'None', value: null}]
            },
        ])
        
        const answersParams = [answers.firstName, answers.lastName, employeePick.employeeRole, employeePick.managerID];
        await connection.promise().query
            (`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, 
            answersParams)

        console.log(chalk.green(`✨${answers.firstName} ${answers.lastName} added successfully!✨`));  
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

