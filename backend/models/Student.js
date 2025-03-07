const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Student = sequelize.define("Student", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: "Email already exists.",
    },
    validate: {
      isEmail: {
        msg: "Please provide a valid email address.",
      },
    },
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        msg: "Age must be a valid number.",
      },
    },
  },
});

module.exports = Student;
