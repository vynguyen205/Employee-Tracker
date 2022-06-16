const inquirer = require('inquirer');

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
    const response = await inquirer.prompt(promptUser);
    switch (response.action) {
        case "View All Departments":
            viewAllDepartments();
            break;
        case "View All Roles":
            viewAllRoles();
            break;
        case "View All Employees":
            viewAllEmployees();
            break;
        case "Add a Department":
            addDepartment();
            break;
        case "Add a Role":
            addRole();
            break;
        case "Add an Employee":
            addEmployee();
            break;
        case "Update an Employee Role":
            updateEmployee();
            break;
    }
}

module.exports = startApp;