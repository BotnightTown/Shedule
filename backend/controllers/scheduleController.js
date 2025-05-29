const Schedule = require('../models/sheduleModel');

exports.getSchedule = async (req, res) => {
  try {
    const weekType = req.query.weekType || 'upper';
    const group = req.query.group || '208';
    const subgroup = req.query.subgroup || '1';
    const schedule = await Schedule.getALL(weekType, group, subgroup);
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}