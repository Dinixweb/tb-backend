import { Model } from "sequelize";
import type { UUID } from "sequelize/types";
import type { IAccount } from "./types";

class User extends Model<IAccount> {
  declare id: typeof UUID;
  declare email: string;
  declare password: string;
  declare active: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;
}
export default User;
