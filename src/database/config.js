const { Sequelize } = require("sequelize");
const pc = require('picocolors');


const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

const db = new Sequelize(database, username, password, {
    host,
    dialect: "mysql",
    pool: {
        max: 10,
        min: 0,
    }
});

const dbConnectMySql = async () => {
    try {
        await db.authenticate();
        console.log(pc.bgGreen("MYSQL Conexión correcta"));
    } catch (e) {
        console.log(pc.bgRed("MYSQL Error de Conexión", e));
    }
};


module.exports = { sequelize: db, dbConnectMySql }