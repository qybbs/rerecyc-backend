import express from "express";
import { getUsers, Register, Login, Logout } from "../controller/users.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controller/refreshToken.js";
import { AddNotes, getNotes, getNote, updateNote, deleteNote } from "../controller/notes.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.get('/notes', verifyToken, getNotes);
router.get('/notes/:noteId', verifyToken, getNote);
router.put('/notes/:noteId', updateNote);
router.delete('/notes/:noteId', verifyToken, deleteNote);
router.post('/users', Register);
router.post('/note', AddNotes);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

export default router;
