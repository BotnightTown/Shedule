import { getCurrent as getCurrentModel, getToday as getTodayModel} from '../models/todayModel.js';

export const getCurrent = async (req, res) => {
  try {
    const group = req.query.group || "208";
    const subgroup = req.query.subgroup || "1";
    const current = await getCurrentModel(group, subgroup);
    res.json(current);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getToday = async (req, res) => {
  try {
    const group = req.query.group || "208";
    const subgroup = req.query.subgroup || "1";
    const today = await getTodayModel(group, subgroup);
    res.json(today);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}