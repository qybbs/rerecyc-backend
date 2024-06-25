import { where } from "sequelize";
import Mitra from "../models/MitraModel.js";
import TmptSampah from "../models/TmptSampahModel.js";

export const getAllTmptSampah = async(req, res) => {
    try {
        const tmptSampah = await TmptSampah.findAll({
            attributes: [
                'id',
                'id_coffeeshop',
                'nama_coffeeshop',
                'status'
            ]
        });
        res.json(tmptSampah);
    } catch (error) {
        console.log(error);
    }
}

export const AddTmptSampah = async(req, res) => {
    const {
        id_coffeeshop,
        status 
    } = req.body;
    if (!id_coffeeshop || !status) {
        return res.status(400).json({msg: "Data yang diberikan belum lengkap!"});
    }
        try {
            const mitra = await Mitra.findAll({
                where: {
                    id: id_coffeeshop
                }
            });
            if (!mitra[0]) return res.sendStatus(403);
            await TmptSampah.create({
                id_coffeeshop: id_coffeeshop,
                nama_coffeeshop: mitra[0].nama_coffeeshop,
                status: status
            });
            const jml = mitra[0].jml_tmpt_sampah + 1;
            await Mitra.update({
                jml_tmpt_sampah: jml
            }, {
                where: {
                    id: mitra[0].id
                }
            })
            res.json({msg: "Data tempat sampah tersimpan!"});
        } catch (error) {
            console.error(error.message); // Log error message
                res.status(500).json({ msg: "Data tempat sampah tidak tersimpan!" }); // Generic error response
        }
}

export const getTmptSampah = async(req, res) => {
    const {idTmptSampah} = req.params;
    try {
        const tmptSampah = await TmptSampah.findAll({
            attributes: [
                'id',
                'id_coffeeshop',
                'nama_coffeeshop',
                'status'
            ],
            where: {
                id: idTmptSampah
            }
        });
        res.json(tmptSampah);
    } catch (error) {
        console.log(error);
    }
}

export const updateTmptSampah = async(req, res) => {
    const { idTmptSampah } = req.params;
    const {
        id_coffeeshop,
        nama_coffeeshop,
        status
    } = req.body;
    if (!id_coffeeshop || !nama_coffeeshop || !status) return res.status(400).json({msg: "Data yang diberikan belum lengkap!"});
    try {
        await TmptSampah.update({ 
            id_coffeeshop,
            nama_coffeeshop,
            status
         }, {
            where: {
                id: idTmptSampah
            }
        });
        res.json({msg: "Data tempat sampah tersimpan!"});
    } catch (error) {
        console.log(error);
    }
}

export const deleteTmptSampah = async(req, res) => {
    const { idTmptSampah } = req.params;
    try {
        TmptSampah.destroy({
            where: { id: idTmptSampah }
        });
    } catch (error) {
        console.log(error);
    }
}