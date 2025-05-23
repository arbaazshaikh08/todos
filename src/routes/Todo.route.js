import { Router } from "express";

const router = Router();

import {
  getAllTodo,
  getTodoById,
  updateTodo,
  createTodo,
  deleteTodo,
} from "../controller/Todo.controller.js";

router.route("/create").post(createTodo);
router.route("/").get(getAllTodo);
router.route("/:id").get(getTodoById);
router.route("/update/:id").put(updateTodo);
router.route("/delete/:id").delete(deleteTodo);

export default router;
