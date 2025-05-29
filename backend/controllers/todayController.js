const Today = require('../models/todayModel');

exports.getCurrent = async (req, res) => {
  try{
    const weekType = req.query.weekType || 'upper';
    const group = req.query.group || '208';
    const subgroup = req.query.subgroup || '1';
    const current = await Today.getCurrent(weekType, group, subgroup);
    res.json(current);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getToday = async (req, res) => {
  try {
    const weekType = req.query.weekType || 'upper';
    const group = req.query.group || '208';
    const subgroup = req.query.subgroup || '1';
    const today = await Today.getToday(weekType, group, subgroup);
    res.json(today);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}