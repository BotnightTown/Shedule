const Today = require('../models/todayModel');

exports.getCurrent = async (req, res) => {
  try{
    const current = await Today.getCurrent();
    res.json(current);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getToday = async (req, res) => {
  try {
    const today = await Today.getToday();
    res.json(today);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}