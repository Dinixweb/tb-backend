import { Router } from "express";
import * as UserResource from "../controllers/UserResources";
import multer from "multer";
const addressUpload = multer({ dest: "" }).single("post");
import userAuth from "../../global/middleware/auth";

const router = Router();

router.post("/CreatePost", userAuth, UserResource.CreatePost);
router.delete("/removePost/:userId/:postId", UserResource.RemovePost);
router.get("/getAllPost", userAuth, UserResource.getAllPost);
router.post("/showInterest", userAuth, UserResource.CreateInterest);
router.get("/getUserAdverts/:userId", userAuth, UserResource.getAllAdverts);
//router.post("/wishlist", UserResource.CreateWishlist);

// Email Parser Api Call
router.post(
  "/travellerResourceInit",
  userAuth,
  UserResource.emailParserResource
);

// Split System
router.post("/createSplit", userAuth, UserResource.createSplit);
router.get("/getSplitRequest/:userId", userAuth, UserResource.getSplitRequest);
router.put("/acceptSplitRequest", userAuth, UserResource.acceptSplitRequest);

//PRN
router.get("/pnrRequest", userAuth, UserResource.PNRSearch);
router.get("/ActivePnr/:userId", UserResource.ActivePnr);
router.post("/createTravelRecord", userAuth, UserResource.CreateTravelRecord);
router.put("/updateTravelRecord", userAuth, UserResource.UpdateTravelRecord);
router.get("/getAllPnrRecords/:userId", userAuth, UserResource.GetAllPnrRecord);
router.post("/addWishlist", userAuth, UserResource.createWishlist);
router.post("/addInterest", userAuth, UserResource.CreateInterestList);
router.get(
  "/GetAreaOfInterest/:userId",
  userAuth,
  UserResource.GetAreaOfInterest
);

export = router;
