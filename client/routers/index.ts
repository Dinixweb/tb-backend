import { Router } from "express";
import profile from "./profile";
import users from "./users";

const router = Router();

router.use("/profiles", profile);
router.use("/auth", users);

router.use;

export = router;
