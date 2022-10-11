import { Router } from "express";
import * as Connections from '../controllers/Connections'




const router = Router()

router.get("/myConnections/:userId", Connections.getMyConnections);


export = router