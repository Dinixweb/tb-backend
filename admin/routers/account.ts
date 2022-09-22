import { Router } from "express";
import {welcome} from "../controllers/adminController";
const router = Router();

router.get("/auth", welcome);

export = router;
