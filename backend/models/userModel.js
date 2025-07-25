import db from '../config/db.js';
import bcrypt from 'bcrypt';

export const register = (username, email, password, group, subgroup) => {
  return new Promise(async (resolve, reject) => {
    try{
      const hashedPassword = await bcrypt.hash(password, 10);
      const sql = `
      INSERT INTO users (username, email, password, \`group\`, subgroup) VALUES (?, ?, ?, ?, ?)
      `;

      db.query(sql, [username, email, hashedPassword, group, subgroup], (err, results) => {
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

export const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    db.query(sql, [email], (err, results) => {
      if (err) return reject(err);
      if (results.length === 0) return resolve(null);
      resolve(results[0]);
    });
  });
};

export const updateUserPasswordById = (id_user, newHashedPassword) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE users SET password = ? WHERE id_user = ?`;
    db.query(sql, [newHashedPassword, id_user], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

export const getPassword = (id_user) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT password FROM users WHERE id_user = ?";
    db.query(sql, [id_user], (err, results) => {
      if (err) return reject("Помилка БД");
      if (results.length === 0) return reject("Користувача не знайдено");
      resolve(results[0].password);
    });
  });
};

export const updatePassword = (id_user, newHashedPassword) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE users SET password = ? WHERE id_user = ?";
    db.query(sql, [newHashedPassword, id_user], (err) => {
      if (err) return reject("Не вдалося оновити пароль");
      resolve();
    });
  });
};

