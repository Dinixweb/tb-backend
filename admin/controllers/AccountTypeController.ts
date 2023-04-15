import { AccountTypeModel } from "../../global/models";
import ServerError from "../../global/errors/ApiError500";
import BadRequestError from "../../global/errors/ApiError404";
import * as Modals from "../../global/models";
import type { Response, Request } from "express";

// -> accountType controller methods
export async function CreateAccountType() {
  const accountType = [
    {
      label: "web-client",
      key: "web-client",
      defaultType: 1,
    },
    {
      label: "mobile-client",
      key: "mobile-client",
      defaultType: 1,
    },
  ];

  try {
    const isAccountType = await AccountTypeModel.findAll();
    if (isAccountType.length > 0) return;
    const addType = [];
    for (const type of accountType) {
      addType.push(AccountTypeModel.create(type));
    }
    console.log("Account Type Created");
    await Promise.all(addType);
  } catch (error) {
    console.log(error);
  }
}

export async function getAll(_req: Request, res: Response) {
  try {
    const types = await AccountTypeModel.findAll({});
    return res
      .status(200)
      .json({ code: 200, message: "Account Types", data: types });
  } catch (error) {
    return res.status(new ServerError().statusCode).json(new ServerError());
  }
}

export async function removeType(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const query = { where: { id } };
    await AccountTypeModel.destroy(query);
    return res.status(200).json({ code: 200, message: "Account Type Deleted" });
  } catch (error) {
    console.log(error);
    return res.status(new ServerError().statusCode).json(new ServerError());
  }
}

export async function createPoints(req, res) {
  const payload = { ...req.body };
  try {
    const addPoints = Modals.UserModels.PointOfferModal;
    const getPoints = await addPoints.findAll();

    const isPoint = getPoints.some((point) => point.points === payload.points);
    console.log(isPoint);
    if (isPoint) return res.send({ message: "point already exist" });
    await addPoints.create(payload);
    res.send({ message: "offers created" });
  } catch (err) {
    console.log(err);
    res.status(new ServerError().statusCode).json(new ServerError());
  }
}
