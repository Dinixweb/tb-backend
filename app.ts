import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routers";
import dotenv from "dotenv";
import { CreateAccountType } from "./admin/controllers/AccountTypeController";

dotenv.config();
const app = express();

const { PORT, NODE_ENV } = process.env;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

function cronJob() {
  let hasRun = false;
  setTimeout(() => {
    if (!hasRun) {
      CreateAccountType();
      hasRun = true;
    }
  }, 1 * 60 * 1000);
}
cronJob();

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
