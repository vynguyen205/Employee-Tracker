const inquirer = require('inquirer');
const functionality = require('./functionality'); // import the functionality file
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
            "Exit"
        ]
}

const startApp = async () => {
    connection.customLog();
    const response = await inquirer.prompt(promptUser);
    switch (response.action) {
        case "View All Departments":
                functionality.viewAllDepartments();
                setTimeout(startApp, 3000);
                break;
            case "View All Roles":
                functionality.viewAllRoles();
                break;
            case "View All Employees":
                functionality.viewAllEmployees();
                break;
            case "Add a Department":
                functionality.addDepartment();
            //     break;
            // case "Add a Role":
            //     addRole();
            
            // case "Add an Employee":
            //     addEmployee();
            
            // case "Update an Employee Role":
            //     updateEmployee();
            
        }
    }

connection.connect().then(startApp);

module.exports = startApp ; 