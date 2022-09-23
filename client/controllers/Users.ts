import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import type { Request, Response } from "express";

import * as Modals from "../../global/models";

import BadRequestError from "../../global/errors/Api400Error";
import ServerError from "../../global/errors/ApiError500";

// -> helper method
async function findByEmail(_email: string, _Modal: any) {
  const query = { where: { email: _email } };
  const currentUser = await _Modal.findOne(query);
  return currentUser;
}

async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

export async function Register(req: Request, res: Response) {
  const payload = { ...req.body };

  if (req.body.type) {
    try {
      const query = { where: { id: payload.type } };
      const currentType = await Modals.AccountTypeModel.findOne(query);

      if (currentType === null) {
        return res
          .status(new BadRequestError().statusCode)
          .json(new BadRequestError(400, "Invalid type"));
      }

      const currentUser = await findByEmail(payload.email, Modals.AdminModel);
      if (currentUser) {
        return res
          .status(new BadRequestError().statusCode)
          .json(new BadRequestError(400, "Email already exist"));
      }

      payload.type = currentType.key;
      const passwordHash = await hashPassword(payload.password);
      payload.password = passwordHash;
      await Modals.AdminModel.create(payload);
      return res.status(200).json({ code: 200, message: "User Created" });
    } catch (error) {
      console.log(error);
      return res.status(new ServerError().statusCode).json(new ServerError());
    }
  }

  let defaultType = "user";
  try {
    const currentUser = await findByEmail(payload.email, Modals.UserModel);
    if (currentUser) {
      return res
        .status(400)
        .json({ code: 400, message: "Email already exist" });
    }

    // -> get default accountType set by Admins
    const accountTypes = await Modals.AccountTypeModel.findAll({});
    for (let index = 0; index < accountTypes.length; index++) {
      const isDefault = accountTypes[index];
      if (isDefault.defaultType) {
        defaultType = isDefault.key;
        break;
      }
    }

    payload.type = defaultType;
    const passwordHash = await hashPassword(payload.password);
    payload.password = passwordHash;
    await Modals.UserModel.create(payload);
    return res.status(200).json({ code: 200, message: "User Created" });
  } catch (error) {
    console.log(error);
    return res.status(new ServerError().statusCode).json(new ServerError());
  }
}

export async function Login(req: Request, res: Response) {
  const { email, password } = req.body;
}
