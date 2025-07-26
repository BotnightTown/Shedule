import { Router } from 'express';
import { getNotes, newNote, deleteNote } from '../controllers/noteController.js';

const router = Router();

router.get('/all', getNotes);
router.post('/create', newNote);
router.delete('/delete/:id', deleteNote);

export default router;