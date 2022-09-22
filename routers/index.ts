import * as express from "express";
import client from "../client/routers";
import admin from "../admin/routers";

const router:express.Router = express.Router();

// Client router path
router.use("/clients", client);

// Admin router path
router.use("/admin", admin);

export = router;
