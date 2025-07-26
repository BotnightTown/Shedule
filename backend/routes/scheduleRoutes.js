import { Router } from 'express';
import { getSchedule } from '../controllers/scheduleController.js';
import { getCurrent, getToday } from '../controllers/todayController.js';

const router = Router();

router.get('/schedule', getSchedule);
router.get('/today/current', getCurrent);
router.get('/today/all', getToday);


export default router;