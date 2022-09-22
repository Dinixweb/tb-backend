import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import util from "util";
import database from "../../global/database";

const db = database;
dotenv.config();
const query = util.promisify(db.query).bind(db);

export async function welcome (req, res){
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
}
