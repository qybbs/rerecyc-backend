import { where } from "sequelize";
import Mitra from "../models/MitraModel.js";

export const getAllMitra = async(req, res) => {
    try {
        const mitra = await Mitra.findAll({
            attributes: [
                'id',
                'nama_coffeeshop',
                'alamat',
                'pj',
                'jabatan',
                'cp_pj',
                'jml_tmpt_sampah'
            ]
        });
        res.json(mitra);
    } catch (error) {
        console.log(error);
    }
}

export const AddMitra = async(req, res) => {
    const {
        nama_coffeeshop,
        alamat,
        pj,
        jabatan,
        cp_pj
    } = req.body;
    if (!nama_coffeeshop || !alamat || !pj || !jabatan || !cp_pj) {
        return res.status(400).json({msg: "Data yang diberikan belum lengkap!"});
    }
        try {
            await Mitra.create({
                nama_coffeeshop: nama_coffeeshop,
                alamat: alamat,
                pj: pj,
                jabatan: jabatan,
                cp_pj: cp_pj,
                jml_tmpt_sampah: 0
            });
            res.json({msg: "Data mitra tersimpan!"});
        } catch (error) {
            console.error(error.message); // Log error message
                res.status(500).json({ msg: "Data mitra tidak tersimpan!" }); // Generic error response
        }
}

export const getMitra = async(req, res) => {
    const {idMitra} = req.params;
    try {
        const mitra = await Mitra.findAll({
            attributes: [
                'id',
                'nama_coffeeshop',
                'alamat',
                'pj',
                'jabatan',
                'cp_pj',
                'jml_tmpt_sampah'
            ],
            where: {
                id: idMitra
            }
        });
        res.json(mitra);
    } catch (error) {
        console.log(error);
    }
}

export const updateMitra = async(req, res) => {
    const { idMitra } = req.params;
    const {
        nama_coffeeshop,
        alamat,
        pj,
        jabatan,
        cp_pj,
        jml_tmpt_sampah
    } = req.body;
    if (!nama_coffeeshop || !alamat || !pj || !jabatan || !cp_pj) return res.status(400).json({msg: "Data yang diberikan belum lengkap!"});
    try {
        await Mitra.update({ 
            nama_coffeeshop,
            alamat,
            pj,
            jabatan,
            cp_pj,
            jml_tmpt_sampah
         }, {
            where: {
                id: idMitra
            }
        });
        res.json({msg: "Data mitra tersimpan!"});
    } catch (error) {
        console.log(error);
    }
}

export const deleteMitra = async(req, res) => {
    const { idMitra } = req.params;
    try {
        Mitra.destroy({
            where: { id: idMitra }
        });
    } catch (error) {
        console.log(error);
    }
}