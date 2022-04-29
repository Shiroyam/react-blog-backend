import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(403).json({ message: "Пользователь не авторизован" });
    }
    const decodeToken = jwt.verify(token, process.env.JWT_KEY);
    req.user = decodeToken;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Пользователь не авторизован" });
  }
};
