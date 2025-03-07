const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("form", "root", "zohaib", {
  host: "localhost",
  port: "3306",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

module.exports = sequelize;
