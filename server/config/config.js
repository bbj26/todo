require("dotenv").config();

module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./database/development.sqlite",
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:",
  },
  production: {
    dialect: "sqlite",
    storage: "./database/production.sqlite",
  },
};
