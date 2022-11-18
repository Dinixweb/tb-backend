import Api404Error from "../../global/errors/ApiError404";
import Api400Error from "../../global/errors/Api400Error";
import * as Modals from "../../global/models/index";
import path from "path";
import cloudinary from "../../global/utils/cloudinaryConfig";
import DatauriParser from "datauri/parser";
import { v4 as uuidv4 } from "uuid";
import { Op, where } from "sequelize";

const parser = new DatauriParser();

export async function connectionList(req, res) {
  const { userId } = req.params;
  const { connectionRef } = req.query;
  try {
    const connectionList = Modals.UserModels;
    const allConnections = async () => {
      const getAllConnection = await connectionList.Connections.findAll({
        where: {
          userId: userId,
        },
      });
      return res.status(200).send(getAllConnection);
    };
    const pendingRequest = async () => {
      const getAllConnection =
        await connectionList.ConnectionAwaitModel.findAll({
          where: {
            userId: userId,
          },
        });
      return res.status(200).send(getAllConnection);
    };

    if (!connectionRef) return allConnections();

    pendingRequest();
  } catch (err) {
    res.status(404).send(new Api404Error());
  }
}
export async function addConnection(req, res) {
  const { userId, receiverId } = req.body;

  const payload = { userId, receiverId };
  const newConnection = { userId, receiverId };

  try {
    const connectionRef = Modals.UserModels;
    const getSenderData = await Modals.UserModels.default.findOne({
      where: { userId: userId },
    });
    const getReceiverData = await Modals.UserModels.default.findOne({
      where: { userId: receiverId },
    });
    const isConnectionExist = await connectionRef.ConnectionAwaitModel.findAll({
      where: {
        userId: receiverId,
        senderId: userId,
      },
    });
    // pending
    payload["firstName"] = getSenderData.firstName;
    payload["lastName"] = getSenderData.lastName;
    payload["senderId"] = userId;
    payload["userId"] = receiverId;

    //new
    newConnection["firstName"] = getReceiverData.firstName;
    newConnection["lastName"] = getReceiverData.lastName;
    newConnection["user_2_Id"] = receiverId;

    if (isConnectionExist.length <= 0) {
      //create a new connection(pending)
      await connectionRef.ConnectionAwaitModel.create(payload);
      //create a new connection(connecitonList)
      await connectionRef.Connections.create(newConnection);
      res.status(201).send({
        message: "request sent successfully",
      });
    } else {
      return res.status(200).send({
        message: "already sent a connection request",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(new Api400Error(0));
  }
}

export async function removeConnection(req, res) {
  const { connectionId } = req.params;
  try {
    const removeUserConnection = Modals.UserModels.Connections;

    const connectionExist = await Modals.UserModels.Connections.findOne({
      where: { connectionId: connectionId },
    });
    if (!connectionExist)
      return res.status(404).send({ message: "connection already deleted" });

    await removeUserConnection.destroy({
      where: { connectionId: connectionId },
    });
    return res.status(200).send({ message: "connection removed" });
  } catch (err) {
    return res.status(400).send(new Api400Error());
  }
}

export async function acceptConnection(req, res) {
  const { userId, senderId, connectionAwaitId, connectionRef } = req.body;
  const payload = { userId, senderId, connectionAwaitId, connectionRef };
  const createConnection = { userId };
  try {
    const getSenderData = await Modals.UserModels.default.findOne({
      where: { userId: userId },
    });

    // pending
    createConnection["firstName"] = getSenderData.firstName;
    createConnection["lastName"] = getSenderData.lastName;
    createConnection["connectionStatus"] = "connected";
    createConnection["user_2_Id"] = senderId;

    const rejectConnection = Modals.UserModels;
    const AcceptConnection = async () => {
      const acceptNewConnection = Modals.UserModels;
      const requestStatus = (payload["requestStatus"] = "confirmed");
      const isConnected = (payload["isConnected"] = true);
      await acceptNewConnection.ConnectionAwaitModel.destroy({
        where: {
          connectionAwaitId: payload.connectionAwaitId,
        },
      });

      await acceptNewConnection.Connections.update(
        {
          connectionStatus: "connected",
        },
        { where: { user_2_Id: userId, userId: senderId } }
      );
      await acceptNewConnection.Connections.create(createConnection);
      return res.status(201).send({ message: "connection accepted" });
    };
    const RejectConnection = async () => {
      const acceptNewConnection = Modals.UserModels.Connections;
      await acceptNewConnection.destroy({
        where: {
          userId: senderId,
          user_2_Id: userId,
        },
      });

      await rejectConnection.ConnectionAwaitModel.destroy({
        where: { userId: userId, senderId: senderId },
      });

      return res.status(201).send({ message: "connection rejected" });
    };
    if (connectionRef === "accept") {
      AcceptConnection();
    } else if (connectionRef === "reject") {
      RejectConnection();
    }
  } catch (err) {
    return res.status(400).send(new Api400Error());
  }
}

export async function checkConnection(req, res) {
  const { userId, user_2_Id } = req.params;

  const payload = { userId, user_2_Id };
  console.log(payload);
  try {
    const isConnectionExist = Modals.UserModels.Connections;
    const response = await isConnectionExist.findOne({
      where: {
        userId: payload.userId,
        user_2_Id: payload.user_2_Id,
        connectionStatus: "connected",
      },
    });

    if (!response)
      return res
        .status(404)
        .send({ message: "you are not connected to this user" });
    res.status(200).send({
      message: "you are conncted to user",
      data: response,
    });
  } catch (err) {
    return res.status(404).send(new Api404Error());
  }
}

export async function SuggestedConnection(req, res) {
  const { userId } = req.params;
  const { name, location, advertType } = req.query;
  try {
    const getAllClients = Modals.UserModels;
    const clientList = getAllClients.default.findAll({
      include: { model: getAllClients.Connections },
    });
    res.status(200).send(clientList);
  } catch (err) {
    res.status(404).send(new Api404Error());
  }
}
