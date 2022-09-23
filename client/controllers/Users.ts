import type { Request, Response } from "express";

import * as Modals from "../../global/models";
export async function Register(req: Request, res: Response) {
  const user = await Modals.AdminModel.findAll({});

  res.status(200).json({ users: user });
}
