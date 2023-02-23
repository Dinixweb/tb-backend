import { Router } from "express";
import * as StripePayment from "../controllers/StripePayment";

const router = Router();

router.post("/paymentInit", StripePayment.paymentInitialize);

export = router;
