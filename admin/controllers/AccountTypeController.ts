import { AccountTypeModel } from "../../global/models";
import ServerError from "../../global/errors/ApiError500";
import BadRequestError from "../../global/errors/ApiError404";

import type { Response, Request } from "express";

// -> accountType controller methods
export async function CreateAccountType(req, res) {
  const { label, key, defaultType } = req.body;
  //const payload = { label, key, defaultType };
  const accountType = [
    {
      label:"web-client", 
      key:"web-client",
      defaultType:1
    },
    {
      label:"mobile-client", 
      key:"mobile-client",
      defaultType:1
    }
  ]

  try {
    const addType = []
    for (const type of accountType) {
       addType.push(AccountTypeModel.create(type))
    }
    await Promise.all(addType)
    return res.status(201).json({ code: 201, message: "Account Types" });
  } catch (error) {
    console.log(error);
    if (error.errors[0].message !== undefined) {
      return res
        .status(new BadRequestError().statusCode)
        .json(new BadRequestError(400, error.errors[0].message));
    }
    return res.status(new ServerError().statusCode).json(new ServerError());
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