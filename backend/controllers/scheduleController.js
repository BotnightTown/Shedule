import { getALL } from '../models/scheduleModel.js';

export const getSchedule = async (req, res) => {
  try {
    const weekType = req.query.weekType || 'upper';
    const group = req.query.group || '208';
    const subgroup = req.query.subgroup || '1';
    const schedule = await getALL(weekType, group, subgroup);
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}