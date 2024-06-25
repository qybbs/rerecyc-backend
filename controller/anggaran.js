import { where } from "sequelize";
import Anggaran from "../models/AnggaranModel.js";
import Users from "../models/userModel.js";

export const getAllAnggaran = async(req, res) => {
    try {
        const anggaran = await Anggaran.findAll({
            attributes: [
                'id',
                'tanggal',
                'id_admin',
                'nama_admin',
                'status_penggunaan',
                'keterangan',
                'nominal'
            ]
        });
        res.json(anggaran);
    } catch (error) {
        console.log(error);
    }
}

export const getAllUser = async(req, res) => {
    try {
        const user = await Users.findAll({
            attributes: [
                'id',
                'name'
            ]
        });
        res.json(user);
    } catch (error) {
        console.log(error);
    }
}

export const AddAnggaran = async(req, res) => {
    const {
        tanggal,
        id_admin,
        status_penggunaan,
        keterangan,
        nominal 
    } = req.body;
    if (!tanggal || !id_admin || !status_penggunaan || !keterangan || !nominal) {
        return res.status(400).json({msg: "Data yang diberikan belum lengkap!"});
    }
        try {
            const user = await Users.findAll({
                where: {
                    id: id_admin
                }
            });
            if (!user[0]) res.status(400);
            await Anggaran.create({
                tanggal: tanggal,
                id_admin: id_admin,
                nama_admin: user[0].name,
                status_penggunaan: status_penggunaan,
                keterangan: keterangan,
                nominal: nominal 
            });
            res.json({msg: "Data penggunaan anggaran tersimpan!"});
        } catch (error) {
            console.error(error.message); // Log error message
                res.status(500).json({ msg: "Data penggunaan anggaran tidak tersimpan!" }); // Generic error response
        }
}

export const getAnggaran = async(req, res) => {
    const {idAnggaran} = req.params;
    try {
        const anggaran = await Anggaran.findAll({
            attributes: [
                'id',
                'tanggal',
                'id_admin',
                'nama_admin',
                'status_penggunaan',
                'keterangan',
                'nominal'
            ],
            where: {
                id: idAnggaran
            }
        });
        res.json(anggaran);
    } catch (error) {
        console.log(error);
    }
}

export const updateAnggaran = async(req, res) => {
    const { idAnggaran } = req.params;
    const {
        tanggal,
        id_admin,
        status_penggunaan,
        keterangan,
        nominal
    } = req.body;
    if (!tanggal || !id_admin || !status_penggunaan || !keterangan || !nominal) return res.status(400).json({msg: "Data yang diberikan belum lengkap!"});
    try {
        const user = await Users.findAll({
            where: {
                id: id_admin
            }
        });
        if (!user[0]) res.status(400);
        await Anggaran.update({ 
            tanggal,
            id_admin,
            nama_admin: user[0].name,
            status_penggunaan,
            keterangan,
            nominal
         }, {
            where: {
                id: idAnggaran
            }
        });
        res.json({msg: "Data penggunaan anggaran tersimpan!"});
    } catch (error) {
        console.log(error);
    }
}

export const deleteAnggaran = async(req, res) => {
    const { idAnggaran } = req.params;
    try {
        Anggaran.destroy({
            where: { id: idAnggaran }
        });
    } catch (error) {
        console.log(error);
    }
}