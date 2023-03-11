import * as Modals from "../../global/models";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import BadRequestError from "../../global/errors/Api400Error";
import ServerError from "../../global/errors/ApiError500";
import { referralCode } from "global/utils/global_function";
import path from "path";
import cloudinary from "../../global/utils/cloudinaryConfig";
import DatauriParser from "datauri/parser";
import { where } from "sequelize";

const parser = new DatauriParser();

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

export async function UserInfo(req, res) {
  try {
    const usersModel = Modals.UserModels.default;
    const getAllUsers = await usersModel.findAll({
      attributes: { exclude: ["password"] },
    });
    const verification = Modals.UserModels.IdentityModel;
    const referredNumber = Modals.UserModels.ReferralCodeActivationModal;
    const connectionCount = Modals.UserModels.Connections;
    const userObj = [];
    const _referral = [];
    const totalReferredUser = [];
    const _numberConn = [];
    for (const data of getAllUsers) {
      userObj.push(
        await verification.findAll({
          where: { userId: data.userId },
          attributes: ["identityType", "identity"],
        })
      );

      _referral.push(
        await referredNumber.findAll({
          where: { createdBy: "%" + data["userId"] + "%" },
        })
      );
      _numberConn.push(
        await connectionCount.findAll({ where: { userId: data.userId } })
      );
    }
    let identity = await Promise.all(userObj);
    const referralCount = await Promise.all(_referral);
    const numberOfConnection = await Promise.all(_numberConn);

    identity = identity.map((data) => data).flat();
    getAllUsers.forEach((a, b) => {
      a.identity = identity[b];
      a.referralCount = referralCount[b].length;
      a.numberOfConnection = numberOfConnection[b].length;
      a.totalReferredUser = referralCount[b].length * 20;
    });
    res.send(getAllUsers);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "error fetching data",
      statusCode: 400,
    });
    return;
  }
}

export async function UserChangeLogs(req, res) {
  const { userId } = req.params;
  try {
    const logs = Modals.UserModels.ChangeLogModel;
    const getAllLogs = logs.findAll({ where: { userId: userId } });
    res.send(getAllLogs);
  } catch (err) {
    console.log(err);
  }
}

export async function createAdminUser(req, res) {
  const payload = { ...req.body };
  const employeeId = uuidv4();
  let accountType: string | number = -1;
  const baseModelRef = {
    "web-client": Modals.AdminModel,
    "mobile-client": Modals.UserModels.default,
  };

  const extName = path.extname(req.file.originalname).toString();
  const file64 = parser.format(extName, req.file.buffer);
  const imagePath = file64.content;

  const modelRef = baseModelRef[payload.createRef] ?? -1;

  try {
    if (payload.createRef === "web-client") {
      const query = { where: { key: payload.createRef } };
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
    payload.employeeId = employeeId;
    const passwordHash = await hashPassword(payload.password);
    payload.password = passwordHash;

    const profileImage = await cloudinary.uploader.upload(imagePath, {
      upload_preset: "identity_uploads",
      public_id: employeeId,
    });
    payload["profileImage"] = profileImage.secure_url;
    await selectModel.create(payload);
    res.send({ message: "user created successfully" });
  } catch (err) {
    console.log(err);
  }
}

export async function AllAdminUsers(req, res) {
  try {
    const adminUsers = Modals.AdminModel;
    const getAllUsers = await adminUsers.findAll({
      attributes: { exclude: ["password"] },
    });
    res.send(getAllUsers);
  } catch (err) {
    console.log(err);
  }
}
export async function deleteAdminUser(req, res) {
  const { employeeId } = req.params;
  try {
    const adminUsers = Modals.AdminModel;
    await adminUsers.destroy({ where: { employeeId: employeeId } });
    res.send({ message: "user deleted" });
  } catch (err) {
    console.log(err);
  }
}

export async function UpdateAdminUser(req, res) {
  const payload = { ...req.body };
  console.log(payload);
  const extName = path.extname(req.file.originalname).toString();
  const file64 = parser.format(extName, req.file.buffer);
  const imagePath = file64.content;
  const employeeId = uuidv4();

  try {
    //Need validtion
    const adminUser = Modals.AdminModel;
    const profileImage = await cloudinary.uploader.upload(imagePath, {
      upload_preset: "identity_uploads",
      public_id: employeeId,
    });
    payload["profileImage"] = profileImage.secure_url;
    const passwordHash = await hashPassword(payload.password);
    payload.password = passwordHash;
    await adminUser.update(
      { ...payload },
      { where: { employeeId: payload.employeeId } }
    );
    res.send({ message: "updated successfully" });
  } catch (err) {
    console.log(err);
  }
}
