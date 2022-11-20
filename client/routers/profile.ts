import { Router } from "express";
import * as Profile from "../controllers/Profiles";
import multer from "multer";
const uploadIdentity = multer({ dest: "" }).single("identity");

const router = Router();

router.get("/auth", Profile.welcome);
router.put("/updateProfileDescription", Profile.profileDescription);
router.put("/updateProfile", Profile.updateProfile);
router.put("/updatePassword", Profile.updatePassword);
router.post("/initEmailUpdate", Profile.updateEmail);
router.post("/initPhoneNumberUpdate", Profile.phoneNumberUpdate);
router.put("/OtpEmailVerification", Profile.OtpEmailVerification);
router.put("/OtpPhoneNumberVerification", Profile.OtpPhoneVerification);
router.post(
  "/identityVerification",
  uploadIdentity,
  Profile.indentityVerification
);
router.get("/userBio/:userId", Profile.getUserBio);
router.get("/getReferralCode/:userId", Profile.getReferralCode);
router.get("/getUserPoints/:userId", Profile.getUserPoints);

router.get("/getIdentityStatus/:userId", Profile.getIdentityByUserId);

export = router;
