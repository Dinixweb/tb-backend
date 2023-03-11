import { Router } from "express";
import * as AdminController from "../controllers/adminController";
const router = Router();

router.get("/getAllUsers", AdminController.UserInfo);
router.get("/getUserChangeLogs/:userId", AdminController.UserChangeLogs);
router.post("/addAdminUser", AdminController.createAdminUser);

export = router;
