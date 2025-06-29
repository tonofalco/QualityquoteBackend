import { Sequelize } from "sequelize";
import pc from "picocolors";


const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

if (!database || !username || !password || !host) {
    throw new Error("Missing required MySQL environment variables.");
}

export const sequelize = new Sequelize(database, username, password, {
    host,
    dialect: "mysql",
    pool: {
        max: 10,
        min: 0,
    },
});

export const dbConnectMySql = async () => {
    try {
        await sequelize.authenticate();
        console.log(pc.bgGreen("MYSQL Conexión correcta"));
    } catch (e) {
        console.log(pc.bgRed("MYSQL Error de Conexión"), e);
    }
};

// ✅ Exportamos por default el objeto sequelize
// export default sequelize;