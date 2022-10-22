import { Router } from "express";
import * as UserResource from "../controllers/UserResources";
import multer from "multer";
const addressUpload = multer({ dest: "" }).single("post");

const router = Router();

router.post("/CreatePost", UserResource.CreatePost);
router.get("/getAllPost", UserResource.getAllPost);
router.post("/showInterest", UserResource.CreateInterest);
router.get("/getUserAdverts/:userId", UserResource.getAllAdverts);
//router.post("/wishlist", UserResource.CreateWishlist);

// Split System
router.post("/createSplit", UserResource.createSplit);
router.get("/getSplitRequest", UserResource.getSplitRequest);

export = router;
