import { where } from "sequelize";
import Notes from "../models/notesModel.js";
import Users from "../models/userModel.js";

export const getNotes = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        if (!user[0]) return res.sendStatus(403);
        const notes = await Notes.findAll({
            attributes: ['id', 'title', 'content'],
            where: {
                user_id: user[0].id
            }
        });
        res.json(notes);
    } catch (error) {
        console.log(error);
    }
}

export const AddNotes = async(req, res) => {
    const { name, title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({msg: "Berikan judul dan konten catatan!"});
    } else if (!name) {
        return res.status(400).json({msg: "name undefined"});
    }
        try {
            const user = await Users.findAll({
                where: {
                    name: name
                }
            });
            if (!user[0]) return res.sendStatus(403);
            await Notes.create({
                user_id: user[0].id,
                title: title,
                content: content
            });
            res.json({msg: "Catatan tersimpan!"});
        } catch (error) {
            console.error(error.message); // Log error message
                res.status(500).json({ msg: "Catatan tidak tersimpan!" }); // Generic error response
        }
}

export const getNote = async(req, res) => {
    const {noteId} = req.params;
    try {
        const notes = await Notes.findAll({
            attributes: ['id', 'title', 'content'],
            where: {
                id: noteId
            }
        });
        res.json(notes);
    } catch (error) {
        console.log(error);
    }
}

export const updateNote = async(req, res) => {
    const { noteId } = req.params;
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({msg: "Berikan judul dan konten catatan!"});
    try {
        await Notes.update({ title, content }, {
            where: {
                id: noteId
            }
        });
        res.json({msg: "Catatan tersimpan!"});
    } catch (error) {
        console.log(error);
    }
}

export const deleteNote = async(req, res) => {
    const { noteId } = req.params;
    try {
        Notes.destroy({
            where: { id: noteId }
        });
    } catch (error) {
        console.log(error);
    }
}