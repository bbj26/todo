const joi = require("joi").extend(require("@joi/date"));

exports.paramId = joi.string().guid({ version: "uuidv4" }).label("Param ID");
