const joi = require("joi").extend(require("@joi/date"));

exports.todo = joi
  .object({
    id: joi
      .string()
      .guid({ version: "uuidv4" })
      .alter({
        post: (client) => client.forbidden(),
        put: (client) => client.forbidden(),
      })
      .label("ToDo ID"),
    text: joi
      .string()
      .alter({
        post: (client) => client.required(),
        put: (client) => client.optional(),
      })
      .label("ToDo Text"),
    done: joi
      .boolean()
      .alter({
        post: (client) => client.optional(),
        put: (client) => client.optional(),
      })
      .label("ToDo Done"),
  })
  .options({ abortEarly: false });
