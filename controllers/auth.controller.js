import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";

export const register = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    const data = { email, password, fullName };
    const { error } = Joi.object({
      email: Joi.string().required().min(3).max(64),
      password: Joi.string().required().min(8).max(16),
      fullName: Joi.string().required().min(3).max(32),
    }).validate(data);

    if (error) {
      return res.status(400).json({ error: "500" });
    }

    const candidate = await User.findOne({ email });

    if (candidate) {
      return res.status(400).json({ error: "Такой пользователь есть!" });
    }

    const user = User.create({
      email,
      password: await bcrypt.hash(password, 8),
      fullName,
    });
    return res.json({
      message: "Пользователь создан!"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ошибка при регистрации" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });

    if (!candidate) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    const passwordCorrect = bcrypt.compareSync(password, candidate.password);
    if (candidate && passwordCorrect) {
      return res.json({
        ...candidate,
        token: jwt.sign({ userId: candidate._id }, process.env.JWT_KEY, {
          expiresIn: "8h",
        }),
      });
    }

   return res.status(400).json({ error: "Неверный логин или пароль" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ошибка при авторизации" });
  }
};
