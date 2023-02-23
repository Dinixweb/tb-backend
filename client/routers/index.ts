import { Router } from "express";
import profile from "./profile";
import users from "./users";
import userResource from "./userResources";
import connection from "./connections";
import stripePayment from "./stripePayment";

const router = Router();

router.use("/profiles", profile);
router.use("/auth", users);
router.use("/resources", userResource);
router.use("/connections", connection);
router.use("/payments", stripePayment);

router.use;

export = router;
