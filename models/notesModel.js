import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Notes = db.define('notes', {
    user_id: {
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING
    },
    content: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

export default Notes;