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
router.post("/createFAQ", AdminController.FAQ);
router.post("/createAboutApp", AdminController.AboutApp);
router.post("/createPrivacy", AdminController.Privacy);
router.post("/createPoints", AdminController.addPoints);
router.get("/getPoints", AdminController.getPoints);
router.post("/createTermsAndCondition", AdminController.TermsAndCondition);
router.get("/getFAQ", AdminController.getFAQ);
router.get("/getAboutApp", AdminController.GetAboutApp);
router.get("/getPrivacy", AdminController.GetPrivacy);
router.get("/getTermsAndCondition", AdminController.GetTermsAndCondition);
router.get("/getAdminChangeLogs", AdminController.AdminChangeLogs);
router.put("/suspendUser", AdminController.SuspendUser);
router.get("/getFlightData", AdminController.GetFlightDetails);
router.get("/getPnrRecords", AdminController.GetAllPrnRecord);
router.get("/getWishlist", AdminController.GetWishlist);
router.get("/getAdvertList", AdminController.AvertDetails);
router.get("/getAllTickets", AdminController.getTickets);
router.get("/getPostReported", AdminController.getPostReported);
router.get("/suspendedUsersHistory", AdminController.getUserSuspension);
router.put("/reactivateUser/:userId", AdminController.ReactivateUser);

router.delete("/deleteAdminUser/:employeeId", AdminController.deleteAdminUser);

export = router;
