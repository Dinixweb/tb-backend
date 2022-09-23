import { sequelizeOptions } from "../database";

// -> schema imports
import { UserSchema, AdminSchema } from "./schemas";
import { AccountTypeSchema } from "../../admin/models/schema";

// -> model imports
import UserModel from "./User.model";
import AdminModel from "./Admin.model";
import AccountTypeModel from "../../admin/models/AccountType";

UserModel.init(
  UserSchema,
  sequelizeOptions({ modelName: "client_account", tableName: "client_account" })
);

AdminModel.init(
  AdminSchema,
  sequelizeOptions({ modelName: "admin_account", tableName: "admin_account" })
);

AccountTypeModel.init(
  AccountTypeSchema,
  sequelizeOptions({
    modelName: "admin_accountTypes",
    tableName: "admin_accountTypes",
  })
);

// Model Relationships
// AccountTypeModel.belongsTo(AdminModel, { foreignKey: "createdBy" });

(async () => {
  await sequelizeOptions({ timestamps: true }).sequelize.sync();
})();

export { UserModel, AdminModel, AccountTypeModel };
