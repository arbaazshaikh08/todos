import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import TodoRoute from "./routes/Todo.route.js";

app.use("/todos", TodoRoute);

export { app };
