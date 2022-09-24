import { validationResult } from "express-validator";
import Joi from "joi";

import BadRequest from "../../errors/ApiError404";

export async function validator(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

export const LoginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  loginRef: Joi.string().required(),
});

export const RegisterValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  createRef: Joi.string().optional(),
  type: Joi.string().optional(),
});

export const JoiValidatorMiddleware =
  (schema: Joi.Schema) => (req: any, res: any, next: any) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const { details } = error;
      const messages = details.map((e) => e.message);
      const message = messages.join(". ");
      return res
        .status(new BadRequest().statusCode)
        .json(new BadRequest(new BadRequest().statusCode, message));
    }
    next();
  };
