import { Router } from "express";
import * as UserController from "../controllers/Users";

import {
  JoiValidatorMiddleware,
  LoginValidationSchema,
  RegisterValidationSchema,
} from "../../global/middleware/validators";
const router = Router();

router.post(
  "/register",
  JoiValidatorMiddleware(RegisterValidationSchema),
  UserController.Register
);
router.post(
  "/login",
  JoiValidatorMiddleware(LoginValidationSchema),
  UserController.Login
);

router.post("/initializePasswordReset", UserController.InitializePasswordReset);

export = router;
