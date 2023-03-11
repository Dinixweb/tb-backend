import * as Modals from "../../global/models";

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
  try {
    const addAdmin = Modals.AdminModel;
    await addAdmin.create(payload);
    res.send({ message: "user created successfully" });
  } catch (err) {
    console.log(err);
  }
}
