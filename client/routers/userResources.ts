import { Router } from "express";
import * as UserResource from "../controllers/UserResources";
import multer from "multer";
const addressUpload = multer({ dest: "" }).single("post");

const router = Router();

router.post("/CreatePost", UserResource.CreatePost);
router.delete("/removePost/:userId/:postId", UserResource.RemovePost);
router.get("/getAllPost", UserResource.getAllPost);
router.post("/showInterest", UserResource.CreateInterest);
router.get("/getUserAdverts/:userId", UserResource.getAllAdverts);
//router.post("/wishlist", UserResource.CreateWishlist);

// Split System
router.post("/createSplit", UserResource.createSplit);
router.get("/getSplitRequest/:userId", UserResource.getSplitRequest);
router.put("/acceptSplitRequest", UserResource.acceptSplitRequest);

//PRN
router.get("/pnrRequest", UserResource.PNRSearch);

export = router;
