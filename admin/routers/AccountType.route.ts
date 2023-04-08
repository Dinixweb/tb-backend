import { Router } from "express";
import * as AccountTypeController from "../controllers/AccountTypeController";
import { adminAuth } from "../../global/middleware/auth";
const router = Router();

router.get("", AccountTypeController.getAll);

// -> admin Middleware
//router.post("", adminAuth, AccountTypeController.CreateAccountType);
router.delete("/:id", adminAuth, AccountTypeController.removeType);
router.post("/createPoints", AccountTypeController.createPoints);
export = router;
