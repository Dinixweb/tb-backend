import { Router } from "express";
import * as UserController from "../controllers/Users";

const router = Router();

router.post("/register", UserController.Register);

export = router;
