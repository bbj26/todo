const { HTTP_STATUS } = require("../constants/httpStatus");
const { Todo } = require("../models");
const {
  createOne,
  getAll,
  getById,
  updateById,
  deleteById,
} = require("./generalCrud");

const { sendSms } = require("../utils/smsService");
exports.createTodo = async (req, res, next) => {
  await createOne(Todo, req, res, next);
};

// Get all todos with optional sorting
exports.getTodos = async (req, res, next) => {
  await getAll(Todo, req, res, next);
};

exports.getTodoById = async (req, res, next) => {
  await getById(Todo, req, res, next);
};

exports.updateTodo = async (req, res, next) => {
  const updatedTodo = await updateById(Todo, req, res, next, false);
  if (updatedTodo) {
    if (
      req.body.done &&
      process.env.INFOBIP_API_KEY &&
      process.env.INFOBIP_BASE_URL &&
      process.env.SMS_SENDER &&
      process.env.SMS_RECEIVER
    ) {
      await sendSms(`To-Do: ${updatedTodo.text} marked as done.`);
    }
    res.status(HTTP_STATUS.OK).json(updatedTodo);
  }
};

exports.deleteTodo = async (req, res, next) => {
  await deleteById(Todo, req, res, next);
};
