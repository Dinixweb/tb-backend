import express from 'express'
import cors from 'cors'
import router from "./routers"
import dotenv from 'dotenv'


dotenv.config();
const app = express();

const { PORT } = process.env;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/v1", router);

if (!module.parent) {
  app.listen(PORT, () => {
    console.log(`Server is Listening on Port: ${PORT}`);
  });
}
export = app;
