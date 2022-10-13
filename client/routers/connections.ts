import { Router } from "express";
import * as Connections from '../controllers/Connections'

const router = Router()


router.post("/connectionRequest", Connections.addConnection);
router.get("/myConnections/:userId", Connections.getMyConnections);
router.get("/allClients/:userId", Connections.GetAllClients);

export = router