import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import transporter from "../config/emailConfig.js";
import { getTemplate } from "../utils/template.js";
import { findUserByEmail, updateUserPasswordById } from "../models/userModel.js";

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.status(404).json({ message: "Користувача не знайдено" });

  const token = jwt.sign({ id: user.id_user }, process.env.JWT_SECRET, { expiresIn: "15m" });
  const resetLink = `https://frontend-production-9bb9.up.railway.app/reset_password/${token}`;

  const html = getTemplate("reset-password", { resetLink });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Скидання паролю",
      html,
    });
    res.json({ message: "Лист для скидання паролю надіслано" });
  } catch (error) {
    res.status(500).json({ message: "Помилка надсилання листа" });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await updateUserPasswordById(decoded.id, hashedPassword);
    res.json({ message: "Пароль успішно змінено" });
  } catch (error) {
    res.status(400).json({ message: "Недійсний або прострочений токен" });
  }
};
