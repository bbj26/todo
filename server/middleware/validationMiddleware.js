const { ERROR_MESSAGES } = require("../constants/errorMessages");
const { ValidationError } = require("./errorClasses");
const joi = require("joi");
const JOI_SCHEMA_LIST = require("./joiSchemaList");
const {
  VALIDATION_OPTION,
  ROUTE_SCHEMA_CONFIG,
} = require("../constants/joiValidation");

exports.bodyValidator = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    throw new ValidationError(ERROR_MESSAGES.NO_BODY);
  }
  joiBodyValidation(req);
  next();
};

exports.paramValidator = (req, res, next) => {
  if (req.params) {
    const schema = JOI_SCHEMA_LIST.paramId;
    for (const param in req.params) {
      joi.assert(req.params[param], schema, VALIDATION_OPTION);
    }
  }
  next();
};

const joiBodyValidation = (req, _res, _next) => {
  const schemaName = getSchemaName(req);
  const schema = JOI_SCHEMA_LIST[schemaName].tailor(req.method.toLowerCase());
  joi.assert(req.body, schema, VALIDATION_OPTION);
};

const getSchemaName = ({ path, baseUrl }) => {
  const schemaName = Object.keys(ROUTE_SCHEMA_CONFIG).find(
    (key) => ROUTE_SCHEMA_CONFIG[key] === path
  );
  if (schemaName) return schemaName;
  return baseUrl.split("/api/")[1].replaceAll("-", "_");
};
