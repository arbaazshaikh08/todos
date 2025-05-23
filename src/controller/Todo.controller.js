import { TodoModel } from "../model/Todo.model.js";

let todos = [];
let currentId = 1;

const getAllTodo = (req, res) => {
  try {
    if (todos.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No todos found",
      });
    }

    return res.status(200).json({
      success: true,
      data: todos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getTodoById = (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    let foundTodo = null;

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        foundTodo = todos[i];
        break;
      }
    }

    if (!foundTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: foundTodo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const createTodo = (req, res) => {
  try {
    const { title, description, completed } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide title and description",
      });
    }

    // Create new todo
    const newTodo = {
      id: currentId++,
      title,
      description,
      completed,
    };

    todos.push(newTodo);

    return res.status(200).json({
      success: true,
      data: newTodo,
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateTodo = (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    let index = -1;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        index = i;
        break;
      }
    }

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    const { error, value } = TodoModel.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    todos[index].id = id;
    todos[index].title = value.title;
    todos[index].description = value.description;
    todos[index].completed = value.completed;

    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: todos[index],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteTodo = (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    let index = -1;

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        index = i;
        break;
      }
    }

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "todo not found",
      });
    }

    todos.splice(index);

    return res.status(200).json({
      success: true,
      message: "todo deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { getAllTodo, getTodoById, updateTodo, createTodo, deleteTodo };
