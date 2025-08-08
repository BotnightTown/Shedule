import pool from '../config/db.js';

export const getNotes = async (id_user) => {
  try{
    const sql = `SELECT * from notes where id_user = ?`
    const [results] = await pool.query(sql, id_user);
    return results;
  } catch (err) {
    throw err;
  }
}
export const newNote = async (id_user, title, content, date) => {
  try{
    const sql = `INSERT INTO notes (\`id_user\`, \`title\`, \`content\`, \`date\`) VALUES (?, ?, ?, ?)`;
    const [results] = await pool.query(sql, [id_user, title, content, date])
    return results;
  } catch (err) {
    throw err;
  }
}
export const deleteNote = async (id_note) => {
  try {
    const sql = `DELETE FROM notes WHERE \`id_note\` = ?`;
    const [results] = await pool.query(sql, [id_note]);
    return results;
  } catch(err) {
    throw err
  }
}