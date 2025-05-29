const Schedule = require('../models/sheduleModel');

exports.getSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.getALL();
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}