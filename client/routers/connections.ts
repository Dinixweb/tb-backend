import { Router } from "express";
import * as Connections from "../controllers/Connections";

const router = Router();

router.post("/connectionRequest", Connections.addConnection);
router.get("/myConnections/:userId", Connections.connectionList);
router.get("/suggestedConnection/:userId", Connections.SuggestedConnection);
router.put("/connectionAction", Connections.acceptConnection);
router.delete("/removeConnection/:connectionId", Connections.removeConnection);

export = router;
