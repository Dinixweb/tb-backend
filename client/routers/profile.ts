import { Router } from "express";
import * as Profile from "../controllers/Profiles";
import multer from "multer";
const uploadIdentity = multer({ dest: "" }).single("identity");

const router = Router();

router.get("/auth", Profile.welcome);
router.post(
  "/identityVerification",
  uploadIdentity,
  Profile.indentityVerification
);
router.get("/userBio/:userId", Profile.getUserBio);
router.get("/getIdentityStatus/:userId", Profile.getIdentityByUserId);

export = router;
