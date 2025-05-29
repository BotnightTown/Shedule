const db = require('../config/db');

exports.getALL = () => {
  return new Promise((resolve, reject) => {

    const sql = `
      SELECT * 
      FROM practice.schedule
      WHERE week_type IN ('all', 'upper')
        AND group_number = '208'
        AND subgroup in ('2', 'all')
      ORDER BY day_of_week, pair_number
    `;

    db.query(sql, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    })
  });
}