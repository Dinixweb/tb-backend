import dotenv from "dotenv";
dotenv.config();

export default {
  jwtSecret: process.env.JWT_SECRET as string,
  JWT_AUDIENCE: process.env.JWT_AUDIENCE as string,
};
