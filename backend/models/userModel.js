import pool from '../config/db.js';
import bcrypt from 'bcrypt';

export const register = async (username, email, password, group, subgroup) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `
      INSERT INTO users (username, email, password, \`group\`, subgroup) VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [username, email, hashedPassword, group, subgroup]);
    return result;
  } catch (err) {
    throw (err);
  }
}

export const login = async (username, password) => {
  try {
    const sql = `SELECT * FROM users WHERE username = ?`;
    const [results] = await pool.query(sql, [username]);

    if (results.length === 0) {
      throw new Error("Користувача не знайдено");
    }

    const user = results[0];

    if (!password) {
      throw new Error("Пароль відсутній");
    }
    if (!user.password) {
      throw new Error("Хеш пароля відсутній");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error("Неправильний пароль");
    }

    return {
      id: user.id_user,
      username: user.username,
      group: user.group,
      subgroup: user.subgroup
    };

  } catch (err) {
    throw err;
  }
};

export const updateInfo = async (username, group, subgroup, id_user) => {
  const sql = `
    UPDATE users 
    SET \`username\` = ?, \`group\` = ?, \`subgroup\` = ? 
    WHERE id_user = ?
  `;
  const [result] = await pool.query(sql, [username, group, subgroup, id_user]);
  return result;
};

export const findUserByEmail = async (email) => {
  const sql = `SELECT * FROM users WHERE email = ?`;
  const [results] = await pool.query(sql, [email]);
  return results.length > 0 ? results[0] : null;
};

export const updateUserPasswordById = async (id_user, newHashedPassword) => {
  const sql = `UPDATE users SET password = ? WHERE id_user = ?`;
  const [result] = await pool.query(sql, [newHashedPassword, id_user]);
  return result;
};

export const getPassword = async (id_user) => {
  const sql = `SELECT password FROM users WHERE id_user = ?`;
  const [results] = await pool.query(sql, [id_user]);

  if (results.length === 0) {
    throw new Error("Користувача не знайдено");
  }
  return results[0].password;
};

export const updatePassword = async (id_user, newHashedPassword) => {
  const sql = `UPDATE users SET password = ? WHERE id_user = ?`;
  await pool.query(sql, [newHashedPassword, id_user]);
};
