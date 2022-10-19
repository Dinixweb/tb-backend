import { Router } from "express";
import * as AdminController from "../controllers/adminController";
const router = Router();

router.get("/auth", AdminController.welcome);

export = router;
