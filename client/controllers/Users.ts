import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import * as Modals from "../../global/models";

import BadRequestError from "../../global/errors/Api400Error";
import ServerError from "../../global/errors/ApiError500";

import ENV from "../../global/config/keys";
import { UserSerializer } from "../serializers/user.serializer";

import type { Request, Response } from "express";
import Api400Error from "../../global/errors/Api400Error";
import {
  generateToken,
  otpCompareTimer,
  otpTimer,
} from "global/utils/global_function";
import { IAccount } from "global/interfaces/user";

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

// -> User Controller methods

/**
 * Register
 * @description Register method handles both web-client and mobile-client.
 * omitting type and createRef while fallback to client_account (DB) and will set type(defaultType)
 * @param req email, password, type?, createRef?
 * @param res
 * @returns
 */
export async function Register(req: Request, res: Response) {
  const payload = { ...req.body };
  let accountType: string | number = -1;
  const baseModelRef = {
    "web-client": Modals.AdminModel,
    "mobile-client": Modals.UserModels.default,
  };

  const modelRef = baseModelRef[payload.createRef] ?? -1;
  try {
    if (payload.type && payload.createRef === "web-client") {
      const query = { where: { id: payload.type } };
      const currentType = await Modals.AccountTypeModel.findOne(query);
      if (currentType === null) {
        return res
          .status(new BadRequestError().statusCode)
          .json(new BadRequestError(400, "Invalid type"));
      }

      accountType = currentType.key;
    }

    const selectModel = modelRef === -1 ? Modals.UserModels.default : modelRef;

    const currentUser = await findByEmail(payload.email, selectModel);
    if (currentUser) {
      return res
        .status(new BadRequestError().statusCode)
        .json(new BadRequestError(400, "Email already exist"));
    }

    if (accountType === -1) {
      const findDefaultAccountTypeQuery = { where: { defaultType: true } };
      const defaultAccountType = await Modals.AccountTypeModel.findOne(
        findDefaultAccountTypeQuery
      );

      // -> a default account type needs to set before creating a new user.
      if (defaultAccountType === null) {
        return res
          .status(new BadRequestError().statusCode)
          .json(new BadRequestError(400, "Please set a default account type"));
      }
      accountType = defaultAccountType.key;
    }
    payload.type = accountType;
    const passwordHash = await hashPassword(payload.password);
    payload.password = passwordHash;
    await selectModel.create(payload);
    return res.status(200).json({ code: 200, message: "Account Created" });
  } catch (error) {
    console.log(error);
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
    "web-client": {
      model: Modals.AdminModel,
      secret: ENV.JWT_ADMIN_SECRET,
    },
    "mobile-client": {
      model: Modals.UserModels.default,
      secret: ENV.jwtSecret,
    },
  };

  const currentUserModal = ModalRef[loginRef];
  try {
    const currentUser = await findByEmail(email, currentUserModal.model);
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
        .json(new BadRequestError(statusCode, "Password is incorrect"));
    }

    const userToken = jwt.sign(
      { data: { id: currentUser.id } },
      currentUserModal.secret,
      {
        audience: ENV.JWT_AUDIENCE,
        expiresIn: "1d",
      }
    );

    payload["token"] = userToken;

    payload["user"] = UserSerializer(currentUser);

    return res
      .status(200)
      .json({ code: 200, message: "Logged In", data: payload });
  } catch (error) {
    console.log(error);
    return res.status(new ServerError().statusCode).json(new ServerError());
  }
}

export async function InitializePasswordReset(req, res) {
  const { email } = req.body;

  const token = generateToken();
  const timestamp = otpTimer();

  try {
    const userRef = Modals.UserModels;
    const checkUser = await userRef.default.findAll({
      where: { email: email },
    });
    if (!checkUser) return;
    //const userId = checkUser.map((userId: IAccount) => userId.userId);
    const userId = [checkUser]["userId"];
    const payload = { email, token, timestamp, userId };
    await userRef.ResetPasswordModel.create(payload);
  } catch (error) {
    res.status(400).send(new Api400Error());
  }
}

export async function tokenInvalidation(req, res) {
  const Timer = otpTimer();
  const otpCompareTime = otpCompareTimer();
  const userRef = Modals.UserModels;
  const timing = await userRef.ResetPasswordModel.findAll();
  for (const t of timing) {
    const hr = t.tokenTimestamp.split(":")[0];
    const hrs = parseInt(hr) - 1;
    const min = t.tokenTimestamp.split(":")[1];
    const sec = t.tokenTimestamp.split(":")[2];
    const _joinedTime = hrs + ":" + min + ":" + sec;
    if (otpCompareTime >= _joinedTime) {
      await userRef.ResetPasswordModel.destroy({
        where: { tokenTimestamp: otpCompareTime },
      });
    }
  }
}
