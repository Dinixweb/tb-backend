import { Router } from "express";
import * as AccountTypeController from "../controllers/AccountTypeController";
const router = Router();

router.get("", AccountTypeController.getAll);
router.post("", AccountTypeController.CreateAccountType);
router.delete("/:id", AccountTypeController.removeType);

export = router;
