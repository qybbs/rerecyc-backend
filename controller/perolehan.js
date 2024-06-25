import { where } from "sequelize";
import Perolehan from "../models/PerolehanModel.js";
import TmptSampah from "../models/TmptSampahModel.js";

export const getAllPerolehan = async(req, res) => {
    try {
        const perolehan = await Perolehan.findAll({
            attributes: [
                'id',
                'tanggal',
                'id_tmptsampah',
                'id_coffeeshop',
                'coffeeshop',
                'pendapatan_kotor',
                'pendapatan_bersih'
            ]
        });
        res.json(perolehan);
    } catch (error) {
        console.log(error);
    }
}

export const AddPerolehan = async(req, res) => {
    const {
        tanggal,
        id_tmptsampah,
        pendapatan_kotor,
        pendapatan_bersih 
    } = req.body;
    if (!tanggal || !id_tmptsampah || !pendapatan_kotor || !pendapatan_bersih) {
        return res.status(400).json({msg: "Data yang diberikan belum lengkap!"});
    }
        try {
            const status = await TmptSampah.findAll({
                where: {
                    id: id_tmptsampah
                }
            });
            if (!status[0]) return res.sendStatus(403);
            await Perolehan.create({
                tanggal: tanggal,
                id_tmptsampah: id_tmptsampah,
                id_coffeeshop: status[0].id_coffeeshop,
                coffeeshop: status[0].nama_coffeeshop,
                pendapatan_kotor: pendapatan_kotor,
                pendapatan_bersih: pendapatan_bersih 
            });
            res.json({msg: "Data perolehan tersimpan!"});
        } catch (error) {
            console.error(error.message); // Log error message
                res.status(500).json({ msg: "Data perolehan tidak tersimpan!" }); // Generic error response
        }
}

export const getPerolehan = async(req, res) => {
    const {idPerolehan} = req.params;
    try {
        const perolehan = await Perolehan.findAll({
            attributes: [
                'id',
                'tanggal',
                'id_tmptsampah',
                'id_coffeeshop',
                'coffeeshop',
                'pendapatan_kotor',
                'pendapatan_bersih'
            ],
            where: {
                id: idPerolehan
            }
        });
        res.json(perolehan);
    } catch (error) {
        console.log(error);
    }
}

export const updatePerolehan = async(req, res) => {
    const { idPerolehan } = req.params;
    const {
        tanggal,
        id_tmptsampah,
        pendapatan_kotor,
        pendapatan_bersih
    } = req.body;
    if (!tanggal || !id_tmptsampah || !pendapatan_kotor || !pendapatan_bersih) return res.status(400).json({msg: "Data yang diberikan belum lengkap!"});
    try {
        const status = await TmptSampah.findAll({
            where: {
                id: id_tmptsampah
            }
        });
        if (!status[0]) return res.sendStatus(403);
        await Perolehan.update({ 
            tanggal,
            id_tmptsampah,
            id_coffeeshop: status[0].id_coffeeshop,
            coffeeshop: status[0].nama_coffeeshop,
            pendapatan_kotor,
            pendapatan_bersih
         }, {
            where: {
                id: idPerolehan
            }
        });
        res.json({msg: "Data perolehan tersimpan!"});
    } catch (error) {
        console.log(error);
    }
}

export const deletePerolehan = async(req, res) => {
    const { idPerolehan } = req.params;
    try {
        Perolehan.destroy({
            where: { id: idPerolehan }
        });
    } catch (error) {
        console.log(error);
    }
}