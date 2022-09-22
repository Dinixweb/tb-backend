import { Dialect, Sequelize } from 'sequelize'
import dotenv from "dotenv";

dotenv.config();

const HOST = process.env.HOST
const USER = process.env.USER as string
const PASSWORD = process.env.PASSWORD as string
const DATABASE = process.env.DATABASE as string
const dbDriver = process.env.DB_DRIVER as Dialect

const sequelizeConnection = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect: dbDriver
})

export default sequelizeConnection


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
