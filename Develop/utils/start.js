const inquirer = require('inquirer');
const functionality = require('./functionality'); // import the functionality file
const chalk = require('chalk');
const connection = require('../connection' );
const promptUser = {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update an Employee Role",
            "Update an Employee's Manager",
            "Delete an Employee",
            "Delete a Role",
            "Delete a Department",
            "Exit"
        ]
}

const startApp = async () => {
    connection.customLog();
    const response = await inquirer.prompt(promptUser);
    switch (response.action) {
        case "View All Departments":
                functionality.viewAllDepartments();
                setTimeout(startApp, 2000);
                break;
            case "View All Roles":
                functionality.viewAllRoles()
                setTimeout(startApp, 2000);;
                break;
            case "View All Employees":
                functionality.viewAllEmployees()
                setTimeout(startApp, 2000);
                break;
            case "Add a Department":
                await functionality.addDepartment()
                return startApp();
            case "Add a Role":
                await functionality.addRole();
                return startApp();
            case "Add an Employee":
                await functionality.addEmployee();
                return startApp();
            case "Update an Employee Role":
                await functionality.updateEmployeeRole();
                return startApp();
            case "Update an Employee's Manager":
                await functionality.updateEmployeeManager();
                return startApp();
            case "Delete an Employee":
                await functionality.deleteEmployee();
                return startApp();
            case "Delete a Role":
                await functionality.deleteRole();
                return startApp();
            case "Delete a Department":
                await functionality.deleteDepartment();
                return startApp();
            case "Exit":
                console.log(chalk.green("Thank you && Goodbye!👋"));
                process.exit();
        }
    }

connection.connect().then(startApp);

module.exports = startApp ; 
 
      