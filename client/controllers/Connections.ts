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
    if (!connectionRef)
      return res.status(400).send({
        message: "api expects an input in the query with key {connectionRef}",
      });
    const connectionList = Modals.UserModels;
    const pendingConnection = async () => {
      const getAllConnection = await connectionList.Connection.findAll({
        include: {
          model: connectionList.default,
          attributes: ["firstName", "lastName"],
        },
        where: {
          receiverUserId: userId,
          isConnected: 0,
          requestStatus: "request pending",
        },
      });
      res.status(200).send(getAllConnection);
    };
    const myConnectionList = async () => {
      const getAllConnection = await connectionList.Connection.findAll({
        include: {
          model: connectionList.default,
          attributes: ["firstName", "lastName"],
        },
        where: {
          receiverUserId: userId,
          isConnected: 1,
          requestStatus: "confirmed",
        },
      });
      res.status(200).send(getAllConnection);
    };
    if (connectionRef === "pending request") {
      pendingConnection();
    } else if (connectionRef === "confirmed") {
      myConnectionList();
    }
  } catch (err) {
    res.status(404).send(new Api404Error());
  }
}
export async function addConnection(req, res) {
  const { senderUserId, receiverUserId } = req.body;

  const payload = { senderUserId, receiverUserId };

  try {
    const connectionRef = Modals.UserModels.Connection;
    const isConnectionExist = await connectionRef.findAll({
      where: {
        receiverUserId: receiverUserId,
        senderUserId: senderUserId,
        requestStatus: {
          [Op.or]: ["request pendind", "request confirmed"],
        },
      },
    });
    payload["clientAccountUserId"] = receiverUserId;
    if (isConnectionExist.length <= 0) {
      await connectionRef.create(payload);
      res.status(201).send({
        message: "request sent successfully",
      });
    } else {
      return res.status(200).send({
        message: "connection already exist",
      });
    }
  } catch (err) {
    return res.status(400).send(new Api400Error(0));
  }
}

export async function removeConnection(req, res) {
  const { connectionId } = req.params;
  try {
    const removeUserConnection = Modals.UserModels.Connection;

    const connectionExist = await Modals.UserModels.Connection.findOne({
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
  const { receiverUserId, connectionId, connectionRef } = req.body;
  const payload = { receiverUserId, connectionId, connectionRef };
  try {
    const AcceptConnection = async () => {
      const acceptNewConnection = Modals.UserModels.Connection;
      const requestStatus = (payload["requestStatus"] = "confirmed");
      const isConnected = (payload["isConnected"] = true);
      await acceptNewConnection.update(
        { requestStatus: requestStatus, isConnected: isConnected },
        {
          where: {
            connectionId: payload.connectionId,
            receiverUserId: payload.receiverUserId,
          },
        }
      );

      return res.status(201).send({ message: "connection accepted" });
    };
    const RejectConnection = async () => {
      const acceptNewConnection = Modals.UserModels.Connection;
      await acceptNewConnection.destroy({
        where: {
          connectionId: payload.connectionId,
          receiverUserId: payload.receiverUserId,
        },
      });

      return res.status(201).send({ message: "connection rejected" });
    };
    if (connectionRef === "accepted") {
      AcceptConnection();
    } else if (connectionRef === "rejected") {
      RejectConnection();
    }
  } catch (err) {
    return res.status(400).send(new Api400Error());
  }
}

export async function SuggestedConnection(req, res) {
  const { userId } = req.params;
  const { name, location, advertType } = req.query;
  try {
    const getAllClients = Modals.UserModels;
    const clientList = getAllClients.default.findAll({
      include: { model: getAllClients.Connection },
    });
    res.status(200).send(clientList);
  } catch (err) {
    res.status(404).send(new Api404Error());
  }
}
