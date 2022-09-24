import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// ->  models
import * as Modals from "../../global/models";

// -> env
import ENV from "../../global/config/keys";

// -> Error Classes
import BadRequestError from "../../global/errors/Api400Error";
import ServerError from "../../global/errors/ApiError500";

// -> Serializer
import { UserSerializer } from "../serializers/user.serializer";

import type { Request, Response } from "express";

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

  if (payload.type) {
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

  try {
    const currentUser = await findByEmail(payload.email, Modals.UserModel);
    if (currentUser) {
      return res
        .status(400)
        .json({ code: 400, message: "Email already exist" });
    }

    const findDefaultAccountTypeQuery = { where: { defaultType: true } };
    const accountTypes = await Modals.AccountTypeModel.findOne(
      findDefaultAccountTypeQuery
    );

    payload.type = accountTypes.key ? accountTypes.key : "user";
    const passwordHash = await hashPassword(payload.password);
    payload.password = passwordHash;
    await Modals.UserModel.create(payload);
    return res.status(200).json({ code: 200, message: "User Created" });
  } catch (error) {
    return res.status(new ServerError().statusCode).json(new ServerError());
  }
}

/**
 * Login
 * * Generate Auth tokens for accounts
 * @description Login will require 3 params, loginRef points to the source login request "web-client" or "mobile-client"
 * @param req email, password, loginRef
 * @param res
 * @returns token, user
 */
export async function Login(req: Request, res: Response) {
  const { email, password, loginRef } = req.body;
  const statusCode = new BadRequestError().statusCode;
  const payload = {};

  const ModalRef = {
    "web-client": Modals.AdminModel,
    "mobile-client": Modals.UserModel,
  };

  const currentUserModal = ModalRef[loginRef];

  try {
    const currentUser = await findByEmail(email, currentUserModal);

    if (!currentUser) {
      return res
        .status(statusCode)
        .json(
          new BadRequestError(statusCode, "Email or Password is incorrect")
        );
    }

    const isPasswordValid = await validatePassword(
      password,
      currentUser.password
    );

    if (!isPasswordValid) {
      return res
        .status(statusCode)
        .json(
          new BadRequestError(statusCode, "Email or Password is incorrect")
        );
    }

    const userToken = jwt.sign({ id: currentUser.id }, ENV.jwtSecret, {
      audience: ENV.JWT_AUDIENCE,
      expiresIn: "1d",
    });

    payload["token"] = userToken;

    payload["user"] = UserSerializer(currentUser);

    return res
      .status(200)
      .json({ code: 200, message: "Logged In", data: payload });
  } catch (error) {
    return res.status(new ServerError().statusCode).json(new ServerError());
  }
}
