import { Router } from "express";
import * as Connections from "../controllers/Connections";
import userAuth from "../../global/middleware/auth";

const router = Router();

router.post("/connectionRequest", userAuth, Connections.addConnection);
router.get("/initFreeView", userAuth, Connections.initializeFreeView);
router.get("/myConnections/:userId", userAuth, Connections.connectionList);
router.get(
  "/suggestedConnection/:userId",
  userAuth,
  Connections.SuggestedConnection
);
router.put("/connectionAction", userAuth, Connections.acceptConnection);
router.get(
  "/checkConnection/:userId/:user_2_Id",
  userAuth,
  Connections.checkConnection
);
router.delete(
  "/removeConnection/:connectionId",
  userAuth,
  Connections.removeConnection
);

export = router;
