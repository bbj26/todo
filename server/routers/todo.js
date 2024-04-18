const express = require("express");
const {
  getTodos,
  getTodoById,
  updateTodo,
  createTodo,
  deleteTodo,
} = require("../controllers/todo");
const {
  bodyValidator,
  paramValidator,
} = require("../middleware/validationMiddleware");
const { callbackErrorHandler } = require("../middleware/errorMiddleware");

const router = express.Router();

router
  .route("/")
  .get(callbackErrorHandler(getTodos))
  .post(bodyValidator, callbackErrorHandler(createTodo));

router
  .route("/:id")
  .get(paramValidator, callbackErrorHandler(getTodoById))
  .patch(paramValidator, bodyValidator, callbackErrorHandler(updateTodo))
  .delete(paramValidator, callbackErrorHandler(deleteTodo));

module.exports = router;
