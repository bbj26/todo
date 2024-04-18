const { HTTP_STATUS } = require("../constants/httpStatus");
const { Sequelize } = require("sequelize");

exports.callbackErrorHandler = (callback) => {
  return (req, res, next) => callback(req, res, next).catch(next);
};

exports.errorMiddleware = async (error, req, res, _next) => {
  try {
    switch (true) {
      case error instanceof Sequelize.ValidationError:
        return handleValidationError(error, res);
      case error instanceof Sequelize.DatabaseError:
        return handleDatabaseError(error, res);
      default:
        return handleGenericError(error, res);
    }
  } catch (err) {
    console.error("Error in error handling middleware:", err);
    res
      .status(HTTP_STATUS.SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const handleValidationError = (error, res) => {
  const details = error.errors.map((err) => err.message);
  return res.status(HTTP_STATUS.INVALID).json({ message: details });
};

const handleDatabaseError = (error, res) => {
  let statusCode = HTTP_STATUS.SERVER_ERROR;
  if (error instanceof Sequelize.UniqueConstraintError) {
    statusCode = HTTP_STATUS.CONFLICT;
  } else if (error instanceof Sequelize.ForeignKeyConstraintError) {
    statusCode = HTTP_STATUS.NOT_FOUND;
  }
  const errorResponse = {
    message: error.message,
    constraint: error.original?.constraint,
    details: error.original?.detail || error.original?.message,
  };
  return res.status(statusCode).json(errorResponse);
};

const handleGenericError = (error, res) => {
  if (error.details && error.name.includes("ValidationError")) {
    const details = error.details.map((err) => err.message);
    return res.status(HTTP_STATUS.INVALID).json({ message: details });
  } else {
    return res.status(HTTP_STATUS.SERVER_ERROR).json({
      message: error.message,
      constraint: error.original?.constraint,
      details: error.original?.message,
    });
  }
};
