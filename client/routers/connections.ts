import { Router } from "express";
import * as Connections from "../controllers/Connections";

const router = Router();

router.post("/connectionRequest", Connections.addConnection);
router.post("/initFreeView", Connections.initializeFreeView);
router.get("/myConnections/:userId", Connections.connectionList);
router.get("/suggestedConnection/:userId", Connections.SuggestedConnection);
router.put("/connectionAction", Connections.acceptConnection);
router.get("/checkConnection/:userId/:user_2_Id", Connections.checkConnection);
router.delete("/removeConnection/:connectionId", Connections.removeConnection);

export = router;
