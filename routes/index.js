import express from "express";
import { AddMitra, deleteMitra, getAllMitra, getMitra, updateMitra } from "../controller/mitra.js";
import { AddTmptSampah, deleteTmptSampah, getAllTmptSampah, getTmptSampah, updateTmptSampah } from "../controller/tmpt_sampah.js";
import { AddPerolehan, deletePerolehan, getAllPerolehan, getPerolehan, updatePerolehan } from "../controller/perolehan.js";
import { AddAnggaran, deleteAnggaran, getAllAnggaran, getAllUser, getAnggaran, updateAnggaran } from "../controller/anggaran.js";

const router = express.Router();

router.get('/mitra', getAllMitra);
router.get('/mitra/:idMitra', getMitra);
router.put('/mitra/:idMitra', updateMitra);
router.delete('/mitra/:idMitra', deleteMitra);
router.post('/mitra', AddMitra);

router.get('/sampah', getAllTmptSampah);
router.get('/sampah/:idTmptSampah', getTmptSampah);
router.put('/sampah/:idTmptSampah', updateTmptSampah);
router.delete('/sampah/:idTmptSampah', deleteTmptSampah);
router.post('/sampah', AddTmptSampah);

router.get('/perolehan', getAllPerolehan);
router.get('/perolehan/:idPerolehan', getPerolehan);
router.put('/perolehan/:idPerolehan', updatePerolehan);
router.delete('/perolehan/:idPerolehan', deletePerolehan);
router.post('/perolehan', AddPerolehan);

router.get('/user', getAllUser);

router.get('/anggaran', getAllAnggaran);
router.get('/anggaran/:idAnggaran', getAnggaran);
router.put('/anggaran/:idAnggaran', updateAnggaran);
router.delete('/anggaran/:idAnggaran', deleteAnggaran);
router.post('/anggaran', AddAnggaran);

export default router;
