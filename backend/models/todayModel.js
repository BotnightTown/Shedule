import db from '../config/db.js';

export const getCurrent = (group, subgroup) => {
  return new Promise((resolve, reject) => {
    const now = new Date();
    const currentDate = now.toISOString().slice(0, 10);
    const testDate = "2025-04-15";
    const currentTime = now.toTimeString().slice(0, 8);
    const testTime = "10:45:41";

    const sql = `
      SELECT s.*,
        DATE_FORMAT(pt.start_time, '%H:%i') AS start_time,
        DATE_FORMAT(pt.end_time, '%H:%i') AS end_time
      FROM practice.schedule AS s
      JOIN practice.pair_times AS pt ON s.pair_number = pt.pair_number
      WHERE 
      (
        s.week_type = 'all'
        OR s.week_type = (
            SELECT w.week_type 
            FROM practice.weeks as w
            WHERE DATE(?) BETWEEN w.start_date AND w.end_date
            LIMIT 1
        )
      )
      AND s.group_number = ?
      AND s.subgroup in (?, 'all')
      AND TIME(?) BETWEEN pt.start_time AND pt.end_time
      ORDER BY s.id_subject
      LIMIT 1;
    `
    // db.query(sql, [currentDate, group, subgroup, currentTime], (err, results) => {
    db.query(sql, [testDate, group, subgroup, testTime], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

export const getToday = (group, subgroup) => {
  return new Promise((resolve, reject) => {
    const now = new Date();
    const currentDate = now.toISOString().slice(0, 10);
    const days = [0, 1, 2, 3, 4, 5, 6];
    const testDay = days[2];
    const currentDay = days[now.getDay()];

    const sql = `
      SELECT s.*,
        DATE_FORMAT(pt.start_time, '%H:%i') AS start_time,
        DATE_FORMAT(pt.end_time, '%H:%i') AS end_time
      FROM practice.schedule AS s
      JOIN practice.pair_times AS pt ON s.pair_number = pt.pair_number
      WHERE 
      (
        s.week_type = 'all'
        OR s.week_type = (
            SELECT w.week_type 
            FROM practice.weeks as w
            LIMIT 1
        )
      )
      AND s.group_number = ?
      AND s.subgroup in (?, 'all')
      AND s.day_of_week = ?
      ORDER BY pt.start_time;
    `

    // db.query(sql, [currentDay, group, subgroup], (err, results) => {
    db.query(sql, [group, subgroup, testDay], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}