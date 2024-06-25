import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Perolehan = db.define('perolehan', {
    tanggal: {
        type: DataTypes.DATE
    },
    id_tmptsampah: {
        type: DataTypes.INTEGER,
        references: {
            model: 'tmpt_sampah', // 'tmpt_sampah' refers to table name
            key: 'id' // 'id' refers to column name in TmptSampah table
        }
    },
    id_coffeeshop: {
        type: DataTypes.INTEGER
    },
    coffeeshop: {
        type: DataTypes.STRING
    },
    pendapatan_kotor: {
        type: DataTypes.INTEGER
    },
    pendapatan_bersih: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true
});

export default Perolehan;
