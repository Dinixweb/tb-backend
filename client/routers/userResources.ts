import { Router } from "express";
import * as UserResource from '../controllers/UserResources'

const router = Router()

router.post("/CreatePost", UserResource.CreatePost)
router.get("/getAllPost", UserResource.getAllPost)

export = router