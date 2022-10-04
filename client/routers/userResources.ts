import { Router } from "express";
import * as UserResource from '../controllers/UserResources'
import multer from 'multer'
const addressUpload = multer({ dest: "" }).single("post");

const router = Router()

router.post("/CreatePost", addressUpload,UserResource.CreatePost)
router.get("/getAllPost", UserResource.getAllPost)

export = router