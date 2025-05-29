const db = require('../config/db');

exports.getCurrent = () => {
  return new Promise((resolve, reject) => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5) + ':00';
    const days = [0, 1, 2, 3, 4, 5, 6];
    const testDay = days[2];
    const currentDay = days[now.getDay()];
    now.setHours(10, 30, 0, 0);
    const testTime = now.toTimeString().slice(0, 8);

    const sql = `
      SELECT s.*,
      DATE_FORMAT(pt.start_time, '%H:%i') AS start_time,
      DATE_FORMAT(pt.end_time, '%H:%i') AS end_time
      FROM practice.schedule AS s
      JOIN practice.pair_times AS pt ON s.pair_number = pt.pair_number
      WHERE s.week_type IN ('all', 'upper')
        AND s.day_of_week = ?
        AND s.group_number = '208'
        AND S.subgroup in ('2', 'all')
        AND TIME(?) BETWEEN pt.start_time AND pt.end_time
      ORDER BY s.id_subject
      LIMIT 1
    `;

    db.query(sql, [currentDay, currentTime], (err, results) => {
    // db.query(sql, [testDay, testTime], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

exports.getToday = () => {
  return new Promise((resolve, reject) => {
    const now = new Date();
    const days = [0, 1, 2, 3, 4, 5, 6];
    const testDay = days[2];
    const currentDay = days[now.getDay()];

    const sql = `
      SELECT s.*,
        DATE_FORMAT(pt.start_time, '%H:%i') AS start_time,
        DATE_FORMAT(pt.end_time, '%H:%i') AS end_time
      FROM practice.schedule AS s
      JOIN practice.pair_times AS pt ON s.pair_number = pt.pair_number
      WHERE s.week_type IN ('all', 'upper')
        AND s.day_of_week = ?
        AND s.group_number = '208'
        AND S.subgroup in ('2', 'all')
      ORDER BY pt.start_time;
    `;

    db.query(sql, [currentDay], (err, results) => {
    // db.query(sql, [testDay], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  })
}