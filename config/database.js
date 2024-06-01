import { Sequelize } from "sequelize";

const db = new Sequelize('mynotes', 'root', '', {
    host: "34.101.181.148",
    dialect: "mysql"
});

export default db;
