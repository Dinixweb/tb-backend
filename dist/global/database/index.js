"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const HOST = process.env.HOST;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;
const dbDriver = process.env.DB_DRIVER;
const sequelizeConnection = new sequelize_1.Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST,
    dialect: dbDriver
});
exports.default = sequelizeConnection;
// import mysql from "mysql2";
// import dotenv from "dotenv";
// dotenv.config();
// const { HOST, USER, PASSWORD, DATABASE } = process.env;
// const db = mysql.createConnection({
//   host: HOST,
//   user: USER,
//   password: PASSWORD,
//   database: DATABASE,
//   timezone: "00:00",
// });
// db.connect((err) => {
//   if (err) throw err;
//   console.log("MySQL is Successfully connected...");
// });
// export = db;
//# sourceMappingURL=index.js.map