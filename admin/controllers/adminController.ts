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
import { HasMany, Op, QueryTypes, Sequelize } from "sequelize";
import Api404Error from "../../global/errors/ApiError404";
import Api400Error from "../../global/errors/Api400Error";
import sequelizeConnection from "../../global/database";
import { WishList } from "global/interfaces/user";

const parser = new DatauriParser();

async function findByEmail(_email: string, _phone, _Modal: any) {
  const query = {
    where: {
      [Op.or]: [
        { email: { [Op.like]: _email } },
        { phoneNumber: { [Op.like]: _phone } },
      ],
    },
  };
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
    res.status(400).send({
      message: "error fetching data",
      statusCode: 400,
    });
    return;
  }
}

export async function UserChangeLogs(req, res) {
  try {
    const logs = Modals.UserModels.ChangeLogModel;
    const getAllLogs = await logs.findAll();
    res.send(getAllLogs);
  } catch (err) {
    res.send(new Api404Error());
  }
}

export async function createAdminUser(req, res) {
  const payload = { ...req.body };
  const employeeId = uuidv4();
  let accountType: string | number = -1;
  const baseModelRef = {
    "web-client": Modals.AdminModel.default,
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
    const currentUser = await findByEmail(
      payload.email,
      payload.phoneNumber,
      selectModel
    );
    if (currentUser) {
      return res
        .status(new BadRequestError().statusCode)
        .json(new BadRequestError(400, "Email or Phone number already exist"));
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
    res.send(new Api404Error());
  }
}

export async function AllAdminUsers(req, res) {
  try {
    const adminUsers = Modals.AdminModel.default;
    const getAllUsers = await adminUsers.findAll({
      attributes: { exclude: ["password"] },
    });
    res.send(getAllUsers);
  } catch (err) {
    res.send(new Api404Error());
  }
}
export async function deleteAdminUser(req, res) {
  const { employeeId } = req.params;
  try {
    const adminUsers = Modals.AdminModel.default;
    await adminUsers.destroy({ where: { employeeId: employeeId } });
    const createLog = Modals.AdminModel.AdminChangeLogModel;
    const actions = {
      action: `Admin user deleted`,
      createdBy: employeeId,
      employeeId: employeeId,
    };
    await createLog.create(actions);
    res.send({ message: "user deleted" });
  } catch (err) {
    res.send(new Api404Error());
  }
}

export async function UpdateAdminUser(req, res) {
  const payload = { ...req.body };
  // const extName = path.extname(req.file.originalname).toString();
  // const file64 = parser.format(extName, req.file.buffer);
  // const imagePath = file64.content;
  // const employeeId = uuidv4();

  try {
    //Need validtion
    const adminUser = Modals.AdminModel.default;
    // const profileImage = await cloudinary.uploader.upload(imagePath, {
    //   upload_preset: "identity_uploads",
    //   public_id: employeeId,
    // });
    // payload["profileImage"] = profileImage.secure_url;
    const passwordHash = await hashPassword(payload.password);
    payload.password = passwordHash;
    await adminUser.update(
      { ...payload },
      { where: { employeeId: payload.employeeId } }
    );
    const createLog = Modals.AdminModel.AdminChangeLogModel;
    const actions = {
      action: `Admin user bio modified`,
      createdBy: payload.employeeId,
      employeeId: payload.employeeId,
    };
    await createLog.create(actions);
    res.send({ message: "updated successfully" });
  } catch (err) {
    res.send(new Api404Error());
  }
}

export async function FAQ(req, res) {
  const payload = { ...req.body };
  try {
    const _FAQ = Modals.AdminModel.FAQPModel;
    if (payload) {
      const getFAQ = await _FAQ.findOne();
      if (getFAQ) {
        await _FAQ.update({ ...payload }, { where: { faqId: getFAQ.faqId } });
      } else {
        await _FAQ.create(payload);
      }
    } else {
      return res.send({ message: "no value entered...check payload" });
    }
    const createLog = Modals.AdminModel.AdminChangeLogModel;
    const actions = {
      action: `FAQ added`,
      createdBy: payload.employeeId,
      employeeId: payload.employeeId,
    };
    await createLog.create(actions);
    res.send({ message: "successfully updated" });
  } catch (err) {
    res.send(new Api404Error());
  }
}
export async function AboutApp(req, res) {
  const payload = { ...req.body };
  try {
    const AboutObj = Modals.AdminModel.AboutModel;
    if (payload) {
      const getAboutApp = await AboutObj.findOne();
      if (getAboutApp) {
        await AboutObj.update(
          { ...payload },
          { where: { aboutId: getAboutApp.aboutId } }
        );
      } else {
        await AboutObj.create(payload);
      }
    } else {
      return res.send({ message: "no value entered...check payload" });
    }
    const createLog = Modals.AdminModel.AdminChangeLogModel;
    const actions = {
      action: `About App added`,
      createdBy: payload.employeeId,
      employeeId: payload.employeeId,
    };
    await createLog.create(actions);
    res.send({ message: "successfully updated" });
  } catch (err) {
    res.send(new Api404Error());
  }
}
export async function Privacy(req, res) {
  const payload = { ...req.body };
  try {
    const _privacy = Modals.AdminModel.PrivacyModel;
    if (payload) {
      const getPrivacy = await _privacy.findOne();
      if (getPrivacy) {
        await _privacy.update(
          { ...payload },
          { where: { privacyId: getPrivacy.privacyId } }
        );
      } else {
        await _privacy.create(payload);
      }
    } else {
      return res.send({ message: "no value entered...check payload" });
    }
    const createLog = Modals.AdminModel.AdminChangeLogModel;
    const actions = {
      action: `Privacy added`,
      createdBy: payload.employeeId,
      employeeId: payload.employeeId,
    };
    await createLog.create(actions);
    res.send({ message: "successfully updated" });
  } catch (err) {
    res.send(new Api404Error());
  }
}
export async function TermsAndCondition(req, res) {
  const payload = { ...req.body };
  try {
    const terms = Modals.AdminModel.TermsAndConditionModel;
    if (payload) {
      const getTerms = await terms.findOne();
      if (getTerms) {
        await terms.update(
          { ...payload },
          {
            where: {
              id: getTerms.id,
            },
          }
        );
      } else {
        const createLog = Modals.AdminModel.AdminChangeLogModel;
        const actions = {
          action: `Terms and Condition added`,
          createdBy: payload.employeeId,
          employeeId: payload.employeeId,
        };
        await createLog.create(actions);
        await terms.create(payload);
      }
    } else {
      return res.send({ message: "no value entered...check payload" });
    }
    res.send({ message: "successfully updated" });
  } catch (err) {
    res.send(new Api404Error());
  }
}

export async function getFAQ(req, res) {
  try {
    const getFAQ = Modals.AdminModel.FAQPModel;
    const [response] = await getFAQ.findAll();

    res.send(response);
  } catch (err) {
    res.send(new Api404Error());
  }
}
export async function GetAboutApp(req, res) {
  try {
    const getAbout = Modals.AdminModel.AboutModel;
    const [response] = await getAbout.findAll();
    res.send(response);
  } catch (err) {
    res.send(new Api404Error());
  }
}
export async function GetPrivacy(req, res) {
  try {
    const getPrivacy = Modals.AdminModel.PrivacyModel;
    const [response] = await getPrivacy.findAll();
    res.send(response);
  } catch (err) {
    res.send(new Api404Error());
  }
}
export async function GetTermsAndCondition(req, res) {
  try {
    const getTerms = Modals.AdminModel.TermsAndConditionModel;
    const [response] = await getTerms.findAll();
    res.send(response);
  } catch (err) {
    res.send(new Api404Error());
  }
}
export async function AdminChangeLogs(req, res) {
  try {
    const logs = Modals.AdminModel.AdminChangeLogModel;
    const getAllLogs = await logs.findAll({
      attributes: ["logId", "createdBy", "action", "createdAt"],
    });
    res.send(getAllLogs);
  } catch (err) {
    res.send(new Api404Error());
  }
}

export async function UpdateTravelRecord(req, res) {
  const payload = { ...req.body };

  const setupType = payload["finalStage"];
  try {
    const addTravelRecord = Modals.UserModels.TravelersModel;
    if (!setupType) return;
    await addTravelRecord.update(payload, {
      where: { travellerId: payload["travellerId"] },
    });
  } catch (err) {
    res.send(new Api400Error());
  }
}

export async function GetAllPrnRecord(req, res) {
  try {
    const pnrRecords = Modals.UserModels.TravelersModel;
    const response = await pnrRecords.findAll();
    res.send(response);
  } catch (err) {
    res.send(new Api404Error());
  }
}
export async function GetWishlist(req, res) {
  const { wishRef } = req.query;
  const today = new Date();
  try {
    let responseObject = await sequelizeConnection.query(
      `SELECT wishlist.wishlistId, wishlist.userId, wishlist.departureAirport, wishlist.destination, wishlist.dateFrom, wishlist.dateTo, wishlist.image, client_account.firstName, client_account.lastName FROM wishlist INNER JOIN client_account ON wishlist.userId = client_account.userId`,
      { type: QueryTypes.SELECT }
    );

    if (wishRef === "active") {
      responseObject = responseObject.filter((date: WishList) => {
        return new Date(date.dateTo) > today;
      });
    } else if (wishRef === "history") {
      responseObject = responseObject.filter((date: WishList) => {
        return new Date(date.dateTo) < today;
      });
    } else if (wishRef === "all") {
      responseObject;
    }
    res.send(responseObject);
  } catch (error) {
    console.log(error);
    res.send(new Api404Error());
  }
}

export async function GetFlightDetails(req, res) {
  try {
    const flightData = Modals.UserModels.TravelersModel;
    const response = await flightData.findAll();
    res.send(response);
  } catch (err) {
    res.send(new Api404Error());
  }
}

export async function SuspendUser(req, res) {
  const { userId, suspensionReason, createdBy } = req.body;
  const date = new Date().toJSON().slice(0, 10);

  try {
    const updateUsers = Modals.UserModels.default;
    const createLog = Modals.AdminModel.AdminChangeLogModel;
    await updateUsers.update(
      {
        isSuspended: true,
        suspensionReason: suspensionReason,
        suspendedDate: date,
      },
      { where: { userId: userId } }
    );
    const actions = {
      action: `Performed a suspension of user with userId,${userId}`,
      createdBy: createdBy,
      employeeId: createdBy,
    };
    await createLog.create(actions);
    res.send({ message: "user suspended" });
  } catch (err) {
    res.send(new Api400Error());
  }
}
export async function ReactivateUser(req, res) {
  const { userId, createdBy } = req.body;
  try {
    const updateUsers = Modals.UserModels.default;
    await updateUsers.update(
      { isSuspended: false, suspensionReason: "", suspendedDate: "" },
      { where: { userId: userId } }
    );
    const createLog = Modals.AdminModel.AdminChangeLogModel;
    const actions = {
      action: `Performed a re-activation of user with userId,${userId}`,
      createdBy: createdBy,
      employeeId: createdBy,
    };
    await createLog.create(actions);
    res.send({ message: "user reactivated successfully" });
  } catch (err) {
    res.send(new Api400Error());
  }
}

export async function AvertDetails(req, res) {
  try {
    const advertList = Modals.UserModels.UserAds;
    const response = await advertList.findAll();
    res.send(response);
  } catch (err) {
    res.send(new Api404Error());
  }
}
export async function addPoints(req, res) {
  const payload = { ...req.body };
  try {
    const createPoints = Modals.AdminModel.CreatePoints;
    const isPoint = await createPoints.findAll({
      where: { points: payload.points, price: payload.price },
    });
    if (isPoint.length > 0)
      return res.send({ message: "points already exist" });
    await createPoints.create(payload);

    const createLog = Modals.AdminModel.AdminChangeLogModel;
    const actions = {
      action: `Created points`,
      createdBy: payload.createdBy,
      employeeId: payload.createdBy,
    };
    await createLog.create(actions);
    res.send({ message: "created successfully" });
  } catch (err) {
    res.send(new Api400Error());
  }
}
export async function getPoints(req, res) {
  try {
    const fetchPoints = Modals.AdminModel.CreatePoints;
    const response = await fetchPoints.findAll();
    res.send(response);
  } catch (err) {
    res.send(new Api404Error());
  }
}

export async function getTickets(req, res) {
  try {
    const fetchTickets = Modals.AdminModel.Tickets;
    const response = await fetchTickets.findAll();
    res.send(response);
  } catch (err) {
    res.send(new Api404Error());
  }
}
export async function getPostReported(req, res) {
  try {
    const getReports = Modals.AdminModel.PostReported;
    const response = await getReports.findAll();
    res.send(response);
  } catch (err) {
    res.send(new Api404Error());
  }
}
export async function getUserSuspension(req, res) {
  try {
    const getUserSuspended = Modals.UserModels.default;
    const response = await getUserSuspended.findAll({
      where: { isSuspended: true },
      attributes: ["suspensionReason", "username", "suspendedDate"],
    });
    res.send(response);
  } catch (err) {
    res.send(new Api404Error());
  }
}

export async function paymentRecieved(req, res) {
  const { paymentRef } = req.query;
  try {
    const payments = Modals.UserModels.Payments;

    let allPayments;
    if (paymentRef === "payments") {
      allPayments = await sequelizeConnection.query(
        `SELECT payments.paymentId, payments.amount, payments.userId, payments.created, payments.referenceNo, payments.currency, payments.paymentMethod, payments.status, payments.receipt_email, payments.cancellationReason, client_account.firstName, client_account.lastName,payments.createdAt, payments.updatedAt  FROM payments INNER JOIN client_account ON payments.userId=client_account.userId`,
        { type: QueryTypes.SELECT }
      );
    } else if (paymentRef === "initialized") {
      allPayments = await sequelizeConnection.query(
        `SELECT credit.creditId, credit.creditSource, credit.userId, credit.amount, credit.creditUnit, credit.paymentStatus, client_account.firstName, client_account.lastName, credit.createdAt, credit.updatedAt FROM credit INNER JOIN client_account ON credit.userId= client_account.userId`,
        { type: QueryTypes.SELECT }
      );
    }
    res.send(allPayments);
  } catch (err) {
    console.log(err);
    res.send(new Api404Error());
  }
}
