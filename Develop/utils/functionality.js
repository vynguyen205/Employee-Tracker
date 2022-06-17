const connection = require('../connection');

viewAllDepartments = async () => {
    const res = await connection.query(`SELECT * FROM department`)
    console.table(res);
};

viewAllRoles = async () => {
    const res = await connection.query(`SELECT * FROM role`)
    console.table(res);
}

module.exports = {viewAllDepartments, viewAllRoles};

