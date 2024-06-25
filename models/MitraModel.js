import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Mitra = db.define('mitra', {
    nama_coffeeshop: {
        type: DataTypes.STRING
    },
    alamat: {
        type: DataTypes.STRING
    },
    pj: {
        type: DataTypes.STRING
    },
    jabatan: {
        type: DataTypes.STRING
    },
    cp_pj: {
        type: DataTypes.STRING
    },
    jml_tmpt_sampah: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true
});

export default Mitra;
