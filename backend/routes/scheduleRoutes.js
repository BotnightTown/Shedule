const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
const todayController = require('../controllers/todayController');

router.get('/schedule', scheduleController.getSchedule);
router.get('/today/current', todayController.getCurrent);
router.get('/today/all', todayController.getToday);

module.exports = router;