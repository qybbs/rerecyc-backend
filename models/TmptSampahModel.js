import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const TmptSampah = db.define('tmpt_sampah', {
    id_coffeeshop: {
        type: DataTypes.INTEGER,
        references: {
            model: 'mitra', // 'mitra' refers to table name
            key: 'id' // 'id' refers to column name in Mitra table
        }
    },
    nama_coffeeshop: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

export default TmptSampah;
