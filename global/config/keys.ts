import dotenv from "dotenv";
dotenv.config();

export default {
  jwtSecret: process.env.JWT_SECRETE as string,
  JWT_AUDIENCE: process.env.JWT_AUDIENCE as string,
  JWT_ADMIN_SECRET: process.env.JWT_ADMIN_SECRET,
};
