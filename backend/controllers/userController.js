import bcrypt from 'bcrypt';
import { register as registerUser, login as loginUser, updateInfo as updateUser, getPassword, updatePassword } from '../models/userModel.js';

export const register = async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const group = req.body.selectedGroup;
    const subgroup = req.body.selectedSubgroup;
    const register = await registerUser(username, email, password, group, subgroup);
    res.json(register);
  } catch (err) {
    res.status(500).json({error: err.message })
  }
}

export const login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const login = await loginUser(username, password);
    req.session.user = login;
    res.json( {user: login} )
  } catch (err) {
    res.status(500).json({error: err.message })
  }
}

export const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Не вдалося завершити сесію' });
    } else {
      res.clearCookie('connect.sid');
      res.json({ message: 'Ви успішно вийшли' });
    }
  })
}

export const getProfile = (req, res) => {
  try {
    if (req.session.user) {
      res.json({ user: req.session.user });
    } else {
      res.status(401).json({ error: "Не авторизовано" });
    }
  } catch (err) {
    res.status(500).json({ error: "Помилка сервера" });
  }
}

export const updateInfo = async (req, res) => {
  try{
    const { username, group, subgroup } = req.body;
    const user = req.session.user;
    if (!user) {
      return res.status(401).json({ error: "Не авторизовано" });
    }
    const id_user = user.id;
    const result = await updateUser(username, group, subgroup, id_user);

    req.session.user.username = username;
    req.session.user.group = group;
    req.session.user.subgroup = subgroup;
    res.json(result);
  } catch (err) {
    res.status(500).json({error: err.message })
  }
}

export const changePassword = async (req, res) => {
  const { id: id_user } = req.session.user;
  const { oldPassword, newPassword } = req.body;

  if (!id_user || !oldPassword || !newPassword) {
    return res.status(400).send({ message: "Недостатньо даних" });
  }

  try {
    const storedHash = await getPassword(id_user);
    const isMatch = await bcrypt.compare(oldPassword, storedHash);
    if (!isMatch) {
      return res.status(401).send({ message: "Старий пароль неправильний" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await updatePassword(id_user, hashedNewPassword);

    res.send({ message: "Пароль успішно змінено" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).send({ message: error || "Внутрішня помилка сервера" });
  }
};
