import { Model } from "sequelize";
import type { UUID } from "sequelize/types";
import type { IAcountType } from "../../global/interfaces/admin";

class AccountType extends Model<IAcountType> {
  declare id: typeof UUID;
  declare label: string;
  declare key: string;
  // declare createdBy: typeof UUID;
  declare defaultType: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;
}
export default AccountType;
