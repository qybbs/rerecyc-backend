import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Anggaran = db.define('anggaran', {
    tanggal: {
        type: DataTypes.DATE
    },
    id_admin: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users', // 'users' refers to table name
            key: 'id' // 'id' refers to column name in Users table
        }
    },
    nama_admin: {
        type: DataTypes.STRING
    },
    status_penggunaan: {
        type: DataTypes.STRING
    },
    keterangan: {
        type: DataTypes.STRING
    },
    nominal: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true
});

export default Anggaran;
