import { Router } from "express";
import * as Profile from "../controllers/Profiles";
import multer from "multer";
const uploadIdentity = multer({ dest: "" }).single("identity");
import userAuth from "../../global/middleware/auth";
const router = Router();

router.get("/auth", Profile.welcome);
router.put("/updateProfileDescription", userAuth, Profile.profileDescription);
router.put("/updateProfile", userAuth, Profile.updateProfile);
router.put("/updatePassword", userAuth, Profile.updatePassword);
router.post("/initEmailUpdate", userAuth, Profile.updateEmail);
router.post("/initPhoneNumberUpdate", userAuth, Profile.phoneNumberUpdate);
router.put("/OtpEmailVerification", userAuth, Profile.OtpEmailVerification);
router.put(
  "/OtpPhoneNumberVerification",
  userAuth,
  Profile.OtpPhoneVerification
);
router.post(
  "/identityVerification",
  userAuth,
  uploadIdentity,
  Profile.indentityVerification
);
router.post("/buyPoints", userAuth, Profile.buyPointInitialize);
router.get(
  "/getBuyPointInitialized/:userId",
  userAuth,
  Profile.getBuyPointInitialized
);
router.get("/getPointOffers", userAuth, Profile.getAllPointOffers);
router.get("/userBio/:userId", userAuth, Profile.getUserBio);
router.get("/getReferralCode/:userId", userAuth, Profile.getReferralCode);
router.get("/getUserPoints/:userId", userAuth, Profile.getUserPoints);

router.get("/getIdentityStatus/:userId", userAuth, Profile.getIdentityByUserId);

export = router;
