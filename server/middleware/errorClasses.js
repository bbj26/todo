const { HTTP_STATUS } = require("../constants/httpStatus");
const { ERROR_MESSAGES } = require("../constants/errorMessages");

class ValidationError extends Error {
  constructor(message) {
    super(message || ERROR_MESSAGES.NOT_FOUND);
    this.name = "ValidationError";
    this.statusCode = HTTP_STATUS.INVALID;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message || ERROR_MESSAGES.NOT_FOUND);
    this.name = "NotFoundError";
    this.statusCode = HTTP_STATUS.NOT_FOUND;
  }
}

module.exports = {
  ValidationError,
  NotFoundError,
};
