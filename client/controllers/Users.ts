import type { Request, Response } from "express";

import * as Modals from "../modals";
export async function Register(req: Request, res: Response) {
  const user = await Modals.UserModal.findAll({});

  res.status(201).json({ users: user });
}
