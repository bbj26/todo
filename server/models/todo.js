"use strict";
const { Model, DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize) => {
  class Todo extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }
  Todo.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Todo",
      timestamps: true,
      updatedAt: "updatedAt",
      createdAt: "createdAt",
      hooks: {
        beforeUpdate: (todo) => {
          todo.updatedAt = new Date();
        },
      },
    }
  );

  return Todo;
};
