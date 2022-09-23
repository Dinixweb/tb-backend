import { AccountTypeModel } from "../../global/models";
import ServerError from "../../global/errors/ApiError500";
import BadRequestError from "../../global/errors/ApiError404";

import type { Response, Request } from "express";

// -> temp response object
const responseMsg = (
  status: number,
  message: string,
  data?: object | any[]
) => {
  return {
    code: status,
    message,
    data,
  };
};

// accountType controller methods
export async function CreateAccountType(req: Request, res: Response) {
  const { label, key } = req.body;

  const user = ""; // -> get AdminUserID from req.user

  const payload = { label, key, createdBy: user };
  try {
    await AccountTypeModel.create(payload);
    res.status(201).json(responseMsg(201, "Account Types"));
  } catch (error) {
    if (error.errors[0].message) {
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
    res
      .status(new ServerError().statusCode)
      .json(responseMsg(200, "Account Types", types));
  } catch (error) {
    console.log(error);
    res.status(new ServerError().statusCode).json(new ServerError());
  }
}

export async function removeType(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const query = { where: { id } };
    await AccountTypeModel.destroy(query);
    res.status(200).json(responseMsg(200, "Account Type Deleted"));
  } catch (error) {
    console.log(error);
    res.status(new ServerError().statusCode).json(new ServerError());
  }
}
