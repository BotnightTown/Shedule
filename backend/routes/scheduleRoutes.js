import { Router } from 'express';
const router = Router();
import { getSchedule } from '../controllers/scheduleController.js';
import { getCurrent, getToday } from '../controllers/todayController.js';
import { register, login, logout, getProfile, updateInfo } from "../controllers/userController.js"
import { getNotes, newNote, deleteNote } from '../controllers/noteController.js';

router.get('/schedule', getSchedule);
router.get('/today/current', getCurrent);
router.get('/today/all', getToday);
router.get('/profile', getProfile);

router.get('/logout', logout);
router.post('/register', register);
router.post('/login', login);
router.patch('/updateInfo', updateInfo);

router.get('/notes/all', getNotes);
router.post('/notes/create', newNote);
router.delete('/notes/:id', deleteNote);



export default router;