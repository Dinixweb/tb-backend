import { Router } from "express";
import multer from "multer";
import * as AdminController from "../controllers/adminController";
const router = Router();
const profileUpload = multer({ dest: "" }).single("profileImage");
router.get("/getAllUsers", AdminController.UserInfo);
router.get("/getUserChangeLogs/:userId", AdminController.UserChangeLogs);
router.post("/addAdminUser", profileUpload, AdminController.createAdminUser);
router.get("/allAdminUsers", AdminController.AllAdminUsers);
router.put("/updateAdminUser", profileUpload, AdminController.UpdateAdminUser);
router.delete("/deleteAdminUser/:employeeId", AdminController.deleteAdminUser);

export = router;
