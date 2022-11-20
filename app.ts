import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routers";
import dotenv from "dotenv";
import { createPoints } from "./admin/controllers/AccountTypeController";

dotenv.config();
const app = express();

const { PORT, NODE_ENV } = process.env;

app.set("view engine", "ejs");
createPoints();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// -> for debugging requests
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1", router);

if (!module.parent) {
  app.listen(PORT, () => {
    console.log(`Server is Listening on Port: localhost:${PORT}/api/v1`);
  });
}
export = app;
