import { Router } from "express";
import account from "./account";
import AccountTypeRoutes from "./AccountType.route";

const router = Router();

router.use("/account", account);
router.use("/account-types", AccountTypeRoutes);

export = router;
