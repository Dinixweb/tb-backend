"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { HOST, USER, PASSWORD, DATABASE } = process.env;
const db = mysql2_1.default.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    timezone: "00:00",
});
db.connect((err) => {
    if (err)
        throw err;
    console.log("MySQL is Successfully connected...");
});
module.exports = db;
//# sourceMappingURL=index.js.map