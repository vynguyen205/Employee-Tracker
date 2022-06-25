const departmentQuestions = [
    {
        type: 'input',
        name: 'departmentName',
        message: 'Please enter name of the department.',
        validate: (value) => {
            if (value) {
                return true;
            } else {
                return 'Please enter a department name.';
            }
        }

    }
]


const roleQuestions = [
    {
        type: 'input',
        name: 'roleTitle',
        message: 'Please enter title of the role.',
        validate: (value) => {
            if (value) {
                return true;
            } else {
                return 'Please enter a role title.';
            }
        }
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Please enter salary of the role.',
        validate: (value) => {
            if (isNaN(value)) {
                return 'Please enter a salary.';
            } else {
                return true;
            }
        }
    }, 
]

const employeeQuestions = [
    {
        type: 'input',
        name: 'firstName',
        message: 'Please enter first name of the employee.',
        validate: (value) => {
            if (value) {
                return true;
            } else {
                return 'Please enter a first name.';
            }
        }
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'Please enter last name of the employee.',
        validate: (value) => {
            if (value) {
                return true;
            } else {
                return 'Please enter a last name.';
            }

        }
    },
]





module.exports = { 
    departmentQuestions, 
    roleQuestions,
    employeeQuestions
};