const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const util = require("util");

const db = require("../../global/database");
dotenv.config();
const query = util.promisify(db.query).bind(db);

exports.welcome = async (req, res) => {
  try {
    res.status(200).send("Welcome to travel buddy:::stay tuned");
    return;
  } catch (error) {
    res.status(400).send({
      message: "error fetching data",
      statusCode: 400,
    });
    return;
  }
};
