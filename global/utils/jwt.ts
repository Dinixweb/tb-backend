import jwt from "jsonwebtoken";

import Keys from "../config/keys";

import type { SignOptions } from "jsonwebtoken";

type jwtPayload = string;

export const sign = (payload: jwtPayload, options?: SignOptions) => {
  return jwt.sign(payload, Keys.jwtSecret, {
    audience: Keys.JWT_AUDIENCE as string,
    ...options,
  });
};

export const verify = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};
