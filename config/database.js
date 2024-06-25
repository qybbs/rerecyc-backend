import { Sequelize } from "sequelize";

const db = new Sequelize('db_rerecyc', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;
