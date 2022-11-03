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
