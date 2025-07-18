import db from '../config/db.js';
import bcrypt from 'bcrypt';

export const register = (username, email, password) => {
  return new Promise(async (resolve, reject) => {
    try{
      const hashedPassword = await bcrypt.hash(password, 10);
      const sql = `
      INSERT INTO users (username, email, password) VALUES (?, ?, ?)
      `;

      db.query(sql, [username, email, hashedPassword], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      })
    } catch (err) {
      reject(err);
    }
  })
}

export const login = (username, password) => {
  return new Promise(async (resolve, reject) => {
    const sql = `SELECT * FROM users WHERE username = ?`;

    db.query(sql, [username], async (err, results) => {
      if (err) {
        reject(err);
      } else if (results.length === 0){
        reject(new Error("Користувача не знайдено"));
      } else {
        const user = results[0];
        if (!password) {
          return reject(new Error('Пароль відсутній'));
        } else if(!user.password){
          return reject(new Error('Хеш пароля відсутній'));
        }

        const match = await bcrypt.compare(password, user.password);

        if(match){
          resolve({
            id: user.id_user,
            username: user.username,
            group: user.group,
            subgroup: user.subgroup
          });
        } else {
          reject(new Error('Неправильний пароль'))
        }
      }
    })
  });
}

export const updateInfo = (username, group, subgroup, id_user) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE users SET \`username\` = ?, \`group\` = ?, \`subgroup\` = ? where id_user = ?`;

    db.query(sql, [username, group, subgroup, id_user], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}