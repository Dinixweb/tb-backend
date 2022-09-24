import { Router } from "express";
import * as UserController from "../controllers/Users";

const router = Router();

router.post("/register", UserController.Register);
router.post("/login", UserController.Login);

export = router;
