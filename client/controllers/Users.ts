import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import * as Modals from "../../global/models";

import BadRequestError from "../../global/errors/Api400Error";
import ServerError from "../../global/errors/ApiError500";

import ENV from "../../global/config/keys";
import {
  AdminSerializer,
  UserSerializer,
} from "../serializers/user.serializer";

import type { Request, Response } from "express";
import Api400Error from "../../global/errors/Api400Error";
import {
  otpCompareTimer,
  otpTimer,
  generateToken,
  generatedOTP,
  referralCode,
} from "../../global/utils/global_function";
import { passwordResetEmail } from "client/email/config/email";
import path from "path";
import cloudinary from "../../global/utils/cloudinaryConfig";
import DatauriParser from "datauri/parser";
const parser = new DatauriParser();
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
  const userId = uuidv4();
  let accountType: string | number = -1;
  const baseModelRef = {
    "web-client": Modals.AdminModel,
    "mobile-client": Modals.UserModels.default,
  };

  const modelRef = baseModelRef[payload.createRef] ?? -1;
  try {
    const addReferralCode = Modals.UserModels.ReferralCodeModel;
    const addReferralCodeActivation =
      Modals.UserModels.ReferralCodeActivationModal;
    const bonus = Modals.UserModels.CreditModel;

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

    //referral code;
    const referralCodeRef = referralCode();
    const referralCodePayload = {};
    referralCodePayload["userId"] = userId;
    referralCodePayload["referralCode"] = referralCodeRef;

    payload.type = accountType;
    payload.userId = userId;
    const passwordHash = await hashPassword(payload.password);
    payload.password = passwordHash;
    payload.trust = "30%";
    await selectModel.create(payload);
    await addReferralCode.create(referralCodePayload);

    if (payload.referralCode) {
      const getUserData = await addReferralCode.findOne({
        where: { referralCode: payload.referralCode },
      });

      if (!getUserData) {
        return res.status(200).json({ code: 200, message: "Account Created" });
      } else {
        const referralActivation = {};
        referralActivation["referralCode"] = payload.referralCode;
        referralActivation["createdBy"] = getUserData.userId;
        referralActivation["usedBy"] = userId;
        await addReferralCodeActivation.create(referralActivation);

        //add bonus
        const addBonus = {};
        addBonus["userId"] = getUserData.userId;
        addBonus["creditUnit"] = 20;
        addBonus["creditSource"] = "referral";
        addBonus["amount"] = 0;
        await bonus.create(addBonus);
        return res.status(200).json({ code: 200, message: "Account Created" });
      }
    }
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
      model: Modals.AdminModel.default,
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
    const userType = UserSerializer(currentUser);
    const adminType = AdminSerializer(currentUser);
    payload["user"] = loginRef === "web-client" ? adminType : userType;

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

  const resetToken = generateToken();
  const tokenTimestamp = otpTimer();

  try {
    const userRef = Modals.UserModels;
    const checkUser = await userRef.default.findAll({
      attributes: ["userId", "firstName"],
      where: { email: email },
    });
    const userIdData = [];
    for (const data of checkUser) {
      userIdData.push(data.userId);
    }
    const firstName: string = checkUser[0].firstName;
    const userId: string = userIdData[0];

    if (!checkUser) return res.status(404).send({ message: "no user found" });

    const payload = { email, resetToken, tokenTimestamp, userId };
    await userRef.ResetPasswordModel.create(payload);
    //passwordResetEmail(firstName, email, resetToken);
    res.status(201).send({ message: "password reset link sent" });
  } catch (error) {
    res.status(400).send(new Api400Error());
  }
}

export async function tokenInvalidation() {
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
