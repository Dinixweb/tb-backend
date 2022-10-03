import { Router } from "express";
import profile from "./profile";
import users from "./users";
import userResource from './userResources'


const router = Router();

router.use("/profiles", profile);
router.use("/auth", users);
router.use("/resources", userResource)

router.use;

export = router;
