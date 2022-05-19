import { Router } from "express";
import {
  create,
  show,
  showId,
  remove,
  update,
} from "../controllers/post.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const route = Router();

route.post("/post", authMiddleware, create);
route.get("/post", show);
route.get("/post/:id", showId);
route.delete("/post/:id", authMiddleware, remove);
route.patch("/post/:id", authMiddleware, update);

export default route;
