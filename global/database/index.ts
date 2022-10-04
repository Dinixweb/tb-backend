import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

import type { ModelOptions } from "sequelize/types";

const isDev = process.env.NODE_ENV;
const HOST = process.env.HOST;

// -> For some reason on Mac, process.env keeps replacing the USER with my current system name
const USER = isDev === "development" ? "root" : (process.env.USER as string);
const PASSWORD = process.env.PASSWORD as string;
const DATABASE = process.env.DATABASE as string;
const dbDriver = process.env.DB_DRIVER as Dialect;
const herokuConnection = process.env.CLEARDB_DATABASE_URL as string
let sequelizeConnection;
if (herokuConnection) {
  sequelizeConnection = new Sequelize(herokuConnection, {
   dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: false
      }
    }
  });
} else {
  sequelizeConnection = new Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST,
    dialect: dbDriver,
    logging: false
  });
}
sequelizeConnection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// helps us configure modal connection to database
export const sequelizeOptions = (options: ModelOptions) => {
  return {
    sequelize: sequelizeConnection,
    ...options,
  };
};

export default sequelizeConnection;

