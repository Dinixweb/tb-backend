import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

import type { ModelOptions } from "sequelize/types";

const isDev = process.env.NODE_ENV;
const HOST = process.env.HOST;

// -> For some reason on Mac, process.env keeps replacing the USER with my current system name
const DBUSER =
  isDev === "development" ? "root" : (process.env.DBUSER as string);
const PASSWORD = process.env.PASSWORD as string;
const DATABASE = process.env.DATABASE as string;
const dbDriver = process.env.DB_DRIVER as Dialect;

let sequelizeConnection: Sequelize;
if (process.env.CLEARDB_DATABASE_URL) {
  sequelizeConnection = new Sequelize(process.env.CLEARDB_DATABASE_URL);
} else {
  sequelizeConnection = new Sequelize(DATABASE, DBUSER, PASSWORD, {
    host: HOST,
    dialect: dbDriver,
    logging: false,
  });
}
sequelizeConnection
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// helps us configure modal connection to database
export const sequelizeOptions = (options: ModelOptions) => {
  return {
    sequelize: sequelizeConnection,
    ...options,
  };
};

export default sequelizeConnection;
