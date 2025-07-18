import db from '../config/db.js';

export const getALL = (weekType, group, subgroup) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * 
      FROM practice.schedule
      WHERE week_type IN ('all', ?)
        AND group_number = ?
        AND subgroup in (?, 'all')
      ORDER BY day_of_week, pair_number
    `;

    db.query(sql, [weekType, group, subgroup], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    })
  });
}