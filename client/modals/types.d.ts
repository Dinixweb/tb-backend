import { UUID } from "sequelize/types";

export interface IAccount {
  id: typeof UUID;
  email: string;
  active?: boolean;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
