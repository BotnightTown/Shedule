import pool from '../config/db.js';

export const getALL = async (weekType, group, subgroup) => {
  try {
    const sql = `
      SELECT * 
      FROM schedule
      WHERE week_type IN ('all', ?)
        AND group_number = ?
        AND subgroup in (?, 'all')
      ORDER BY day_of_week, pair_number
    `;

    const [rows] = await pool.query(sql, [weekType, group, subgroup]);
    return rows;
  } catch (err) {
    throw err;
  }
}