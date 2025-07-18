import db from '../config/db.js';

export const getNotes = (id_user) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * from notes where id_user = ?`

    db.query(sql, [id_user], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    })
  });
}

export const newNote = (id_user, title, content, date) => {
  return new Promise((resolve, reject) => {
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");

    const sql = `INSERT INTO notes (\`id_user\`, \`title\`, \`content\`, \`date\`) VALUES (?, ?, ?, ?)`;

    db.query(sql, [id_user, title, content, date], (err, results) => {
      if (err) reject(err)
      else resolve(results)
    })
  })
};

export const deleteNote = (id_note) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM notes WHERE \`id_note\` = ?`;

    db.query(sql, [id_note], (err, results) => {
      if (err) reject(err)
      else resolve(results)
    })
  })
}