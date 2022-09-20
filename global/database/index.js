const mysql = require("mysql2");
require("dotenv").config();

const { HOST, USER, PASSWORD, DATABASE } = process.env;

const db = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  timezone: "00:00",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL is Successfully connected...");
});

module.exports = db;
