const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", studentRoutes);

sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
