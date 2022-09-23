import { Router } from "express";
import { welcome } from "../controllers/Profiles";

const router = Router();

router.get("/auth", welcome);

export = router;
