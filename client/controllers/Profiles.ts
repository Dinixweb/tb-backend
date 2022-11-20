import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import util from "util";
import database from "../../global/database";

import path from "path";
import cloudinary from "../../global/utils/cloudinaryConfig";
import DatauriParser from "datauri/parser";
import { v4 as uuidv4 } from "uuid";
import * as Modals from "../../global/models";
import Api404Error from "../../global/errors/ApiError404";
import Api400Error from "../../global/errors/Api400Error";
import {
  changeEmail,
  changePhone,
  EmailChangeSuccess,
} from "../email/config/email";
import { generatedOTP } from "../../global/utils/global_function";
import { Credits } from "global/interfaces/user";

const parser = new DatauriParser();

const db = database;
dotenv.config();
const query = util.promisify(db.query).bind(db);

export async function welcome(req, res) {
  try {
    res.status(200).send("Welcome to travel buddy:::stay tuned");
    return;
  } catch (error) {
    res.status(400).send({
      message: "error fetching data",
      statusCode: 400,
    });
    return;
  }
}

export async function indentityVerification(req, res) {
  const { userId, identityType, identityNumber, expiryDate } = req.body;
  const identityId = uuidv4();
  const extName = path.extname(req.file.originalname).toString();
  const file64 = parser.format(extName, req.file.buffer);
  const imagePath = file64.content;

  try {
    const indentityRef = Modals.UserModels.IdentityModel;

    const uploadResponse = await cloudinary.uploader.upload(imagePath, {
      upload_preset: "identity_uploads",
      public_id: identityId,
    });

    await indentityRef.create({
      identityId: identityId,
      identity: uploadResponse.secure_url,
      identityType: identityType,
      identityNumber: identityNumber,
      userId: userId,
      expiryDate: expiryDate,
    });

    res.status(201).send({ message: "uploaded successfully" });
  } catch (err) {
    res.status(400).send(new Api400Error());
  }
}

export async function getIdentityByUserId(req, res) {
  const { userId } = req.params;
  try {
    const getIdentity = Modals.UserModels.IdentityModel;
    const response = await getIdentity.findAll({ where: { userId: userId } });
    res.status(200).send(response);
  } catch (err) {
    res.status(404).send(new Api404Error());
  }
}

export async function getUserBio(req, res) {
  const { userId } = req.params;
  try {
    const getUserBio = Modals.UserModels.default;
    const response = await getUserBio.findAll({
      attributes: { exclude: ["password"] },
      where: { userId: userId },
    });
    res.status(200).send(response);
  } catch (err) {
    res.status(404).send(new Api404Error());
  }
}

export async function profileDescription(req, res) {
  const { description, userId } = req.body;
  try {
    const updateDescription = Modals.UserModels.default;
    await updateDescription.update(
      { description: description },
      { where: { userId: userId } }
    );
    res.status(200).send({ message: "update successful" });
  } catch (err) {
    res.status(404).send(new Api404Error());
  }
}
export async function updateProfile(req, res) {
  const payload = { ...req.body };
  try {
    const updateDescription = Modals.UserModels.default;
    await updateDescription.update(payload, {
      where: { userId: payload.userId },
    });
    res.status(200).send({ message: "update successful" });
  } catch (err) {
    res.status(404).send(new Api404Error());
  }
}
export async function updateEmail(req, res) {
  const payload = { ...req.body };
  try {
    const getUserData = await Modals.UserModels.default.findOne({
      where: { userId: payload.userId, email: payload.oldEmail },
    });

    if (!getUserData) return res.status(400).send({ message: "invalid email" });
    payload["email"] = payload.newEmail;
    const updateEmails = Modals.UserModels.TokensModel;
    payload["email"] = payload.newEmail;
    const otp = generatedOTP();
    payload["otp"] = otp;
    await updateEmails.create(payload);

    changeEmail(getUserData.firstName, getUserData.email, otp);
    return res.status(200).send({ message: "otp sent to old email" });
  } catch (err) {
    console.log(err);
    res.status(404).send(new Api404Error());
  }
}
export async function phoneNumberUpdate(req, res) {
  const payload = { ...req.body };
  try {
    const getUserData = await Modals.UserModels.default.findOne({
      where: { userId: payload.userId, phoneNumber: payload.oldPhoneNumber },
    });

    if (!getUserData) return res.status(400).send({ message: "invalid phone" });
    payload["phoneNumber"] = payload.newPhoneNumber;
    const updatePhone = Modals.UserModels.TokensModel;
    payload["phoneNumber"] = payload.newPhoneNumber;
    const otp = generatedOTP();
    payload["otp"] = otp;
    await updatePhone.create(payload);

    changePhone(getUserData.firstName, getUserData.email, otp);
    return res.status(200).send({ message: "otp sent to email" });
  } catch (err) {
    console.log(err);
    res.status(404).send(new Api404Error());
  }
}
export async function OtpEmailVerification(req, res) {
  const payload = { ...req.body };
  try {
    const getUserToken = await Modals.UserModels.TokensModel.findOne({
      where: { userId: payload.userId, otp: payload.otp },
    });

    const getUserData = await Modals.UserModels.default.findOne({
      where: { userId: payload.userId },
    });

    console.log(getUserToken, getUserData);

    if (!getUserToken) return res.status(400).send({ message: "invalid otp" });

    const updateEmails = Modals.UserModels.default;
    await updateEmails.update(
      { email: getUserToken.email },
      {
        where: { userId: payload.userId },
      }
    );

    EmailChangeSuccess(getUserData.firstName, getUserData.email);
    return res.status(200).send({ message: "email updated successfully" });
  } catch (err) {
    res.status(404).send(new Api404Error());
  }
}
export async function OtpPhoneVerification(req, res) {
  const payload = { ...req.body };
  try {
    const getUserToken = await Modals.UserModels.TokensModel.findOne({
      where: { userId: payload.userId, otp: payload.otp },
    });

    if (!getUserToken) return res.status(400).send({ message: "invalid otp" });

    const updateEmails = Modals.UserModels.default;
    await updateEmails.update(
      { phoneNumber: getUserToken.phoneNumber },
      {
        where: { userId: payload.userId },
      }
    );

    return res.status(200).send({ message: "email updated successfully" });
  } catch (err) {
    res.status(404).send(new Api404Error());
  }
}
export async function updatePassword(req, res) {
  console.log(req.body);
  const payload = { ...req.body };

  const passwordHash = await hashPassword(payload.password);
  payload.password = passwordHash;
  try {
    const updatePassword = Modals.UserModels.default;
    await updatePassword.update(payload, {
      where: { userId: payload.userId },
    });
    res.status(200).send({ message: "update successful" });
  } catch (err) {
    res.status(404).send(new Api404Error());
  }
}

async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function getReferralCode(req, res) {
  const { userId } = req.params;

  try {
    const getReferralCode = Modals.UserModels.ReferralCodeModel;
    const referrralResponse = await getReferralCode.findOne({
      where: { userId: userId },
    });
    res.status(200).send(referrralResponse);
  } catch (err) {
    res.status(404).send(new Api404Error());
  }
}
export async function getUserPoints(req, res) {
  const { userId } = req.params;
  try {
    const getCredit = Modals.UserModels.CreditModel;
    const CreditResponse = await getCredit.findAll({
      where: { userId: userId },
    });
    const creditUnit = CreditResponse.map(
      (credit: Credits) => credit.creditUnit
    ).reduce((i, a) => i + a, 0);
    const points = { creditUnit };
    return res.send(points);
  } catch (err) {
    return res.status(404).send(new Api404Error());
  }
}

export async function getAllPointOffers(req, res) {
  try {
    const allPoints = Modals.UserModels.PointOfferModal;
    const response = await allPoints.findAll();
    res.status(200).send(response);
  } catch (err) {
    return res.status(404).send(new Api404Error());
  }
}

export async function buyPointInitialize(req, res) {
  const payload = { ...req.body };
  try {
    const checkPriceAmount = Modals.UserModels.PointOfferModal;
    const isPrice_Amount = await checkPriceAmount.findAll({
      where: { price: payload.price, points: payload.points },
    });
    if (isPrice_Amount.length <= 0)
      return res.status(404).send({
        message:
          "this offer does not exit. please select from the listed offers",
      });
    const buyPoints = Modals.UserModels.CreditModel;
    payload["creditSource"] = "paid";
    payload["amount"] = payload.price;
    payload["creditUnit"] = payload.points;

    await buyPoints.create(payload);
    res.status(201).send({ message: "point purchase successful" });
  } catch (err) {
    return res.status(404).send(new Api404Error());
  }
}
