import { Router } from "express";
import * as StripePayment from "../controllers/StripePayment";
import userAuth from "../../global/middleware/auth";
const router = Router();

router.post("/paymentInit", userAuth, StripePayment.paymentInitialize);

export = router;
