import { Router } from "express";
import { welcome } from "../controllers/AdminController";
const router = Router();

router.get("/auth", welcome);

export = router;
