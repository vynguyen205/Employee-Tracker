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
        // destructuring the role array to get the role id and title
        const [role] = await connection.promise().query(`SELECT * FROM role`);
        //loop through the role and create a new array of role choices
        const roleChoices = role.map(role => {
            return {
                name: role.title,
                value: role.id
            }
        })
        
        // destructuring the manager array to get the manager id and first and last name
        const [manager] = await connection.promise().query(`SELECT * FROM employee`);
        //loop through the manager and create a new array of manager choices
        const managerChoices = manager.map(manager => {
            return {
                name: `${manager.first_name} ${manager.last_name}`,
                value: manager.id
            }
        })

        const employeePick = await inquirer.prompt ([
            {
                type: 'list',
                name: 'employeeRole',
                message: 'Select role of the employee.',
                choices: roleChoices
            },
            {
                type: 'list',
                name: 'managerID',
                message: `Please select Employee's Manager:`,
                // if no manager then have the user select none
                choices: [...managerChoices, {name: 'None', value: null}]
                
            },
        ])
        const answers = await inquirer.prompt(questions.employeeQuestions);
        //create an array of answers to pass to the query
        const answersParams = [answers.firstName, answers.lastName, employeePick.employeeRole, employeePick.managerID];
        //insert the new employee into the database
        await connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, answersParams)
        console.log(chalk.green(`✨Added ${answers.firstName} ${answers.lastName} as an employee successfully!✨\n`));  
    } 
    catch (err) {
        console.log(chalk.redBright(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, err));
    }
}

updateEmployeeRole = async () => {
    try {
        // destructuring the employee array to get the employee id and first and last name
        const [employee] = await connection.promise().query(`SELECT * FROM employee`);
        // loop through the employee and create a new array of employee choices
        const employeeChoices = employee.map(employee => {
            return {
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }
        })

        // destructuring the role array to get the role id and title
        const [role] = await connection.promise().query(`SELECT * FROM role`);
        // loop through the role and create a new array of role choices
        const roleChoices = role.map(role => {
            return {
                name: role.title,
                value: role.id
            }
        })

        const employeePick = await inquirer.prompt ([
            {
                type: 'list',
                name: 'employee',
                message: 'Select employee to update role.', 
                choices: employeeChoices
            },
            {
                type: 'list',
                name: 'role',
                message: 'Select role to update employee to.',
                choices: roleChoices
            }
        ]);

        await connection.promise().query(`UPDATE employee SET role_id = ? WHERE id = ?`, [employeePick.role, employeePick.employee])
        console.log(chalk.green(`✨Role updated successfully!✨\n`));

    } catch (err) {
        console.log(chalk.redBright(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, err));
    }
}

updateEmployeeManager = async () => {
    try {
        // destructuring the employee array to get the employee id and first and last name
        const [employee] = await connection.promise().query(`SELECT * FROM employee`);
        // loop through the employee and create a new array of employee choices
        const employeeChoices = employee.map(employee => {
            return {
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }
        })

        const [manager] = await connection.promise().query(`SELECT * FROM employee`);
        // loop through the manager and create a new array of manager choices
        const managerChoices = manager.map(manager => {
            return {
                name: `${manager.first_name} ${manager.last_name}`,
                value: manager.id
            }
        })

        const employeePick = await inquirer.prompt ([
            {
                type: 'list',
                name: 'employee',
                message: 'Select employee to update manager.',
                choices: employeeChoices
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Select manager to update employee to.',
                choices: managerChoices
            }
        ]);

        await connection.promise().query(`UPDATE employee SET manager_id = ? WHERE id = ?`, [employeePick.manager, employeePick.employee])
        console.log(chalk.green(`✨Employee's manager updated successfully!✨\n`));
    } catch (err) {
        console.log(chalk.redBright(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, err));
    }
}

deleteEmployee = async () => {
    const [employee] = await connection.promise().query(`SELECT * FROM employee`);
    const employeeChoices = employee.map(employee => {
        return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }
    })

    const employeePick = await inquirer.prompt ([
        {
            type: 'list',
            name: 'employee',
            message: 'Select employee to delete.',
            choices: employeeChoices
        }
    ]);

    await connection.promise().query(`DELETE FROM employee WHERE id = ?`, [employeePick.employee])
    console.log(chalk.green(`✨Employee deleted successfully!✨\n`));
}

deleteRole = async () => {
    const [role] = await connection.promise().query(`SELECT * FROM role`);
    const roleChoices = role.map(role => {
        return {
            name: role.title,
            value: role.id
        }
    })

    const rolePick = await inquirer.prompt ([
        {
            type: 'list',
            name: 'role',
            message: 'Select role to delete.',
            choices: roleChoices
        }
    ]);

    await connection.promise().query(`DELETE FROM role WHERE id = ?`, [rolePick.role])
    console.log(chalk.green(`✨Role deleted successfully!✨\n`));
}

deleteDepartment = async () => {
    const [department] = await connection.promise().query(`SELECT * FROM department`);
    const departmentChoices = department.map(department => {
        return {
            name: department.name,
            value: department.id
        }
    }
    )

    const departmentPick = await inquirer.prompt ([
        {
            type: 'list',
            name: 'department',
            message: 'Select department to delete.',
            choices: departmentChoices
        }
    ]);

    await connection.promise().query(`DELETE FROM department WHERE id = ?`, [departmentPick.department])
    console.log(chalk.green(`✨Department deleted successfully!✨\n`));
}

module.exports = {
    viewAllDepartments, 
    viewAllRoles, 
    viewAllEmployees, 
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    deleteEmployee,
    deleteRole,
    deleteDepartment
};

