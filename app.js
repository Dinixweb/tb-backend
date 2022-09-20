const express = require("express");
const cors = require("cors");

require("dotenv").config();
const app = express();

const { PORT } = process.env;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/v1", require("./routers"));

if (!module.parent) {
  app.listen(PORT, () => {
    console.log(`Server is Listening on Port: ${PORT}`);
  });
}
module.exports = app;
