import { Router } from "express";
import {CreateUsers} from "../controllers/Users";

const router = Router();

router.get("/users", CreateUsers);

export = router;
