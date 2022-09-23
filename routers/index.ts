import * as express from "express";
import client from "../client/routers/index";
import admin from "../admin/routers/index";

const router: express.Router = express.Router();

// Client router path
router.use("/clients", client);

// Admin router path
router.use("/admin", admin);

export = router;
