import { sequelizeOptions } from "../database";

// -> schema imports
import { UserSchema, AdminSchema, Subscription, UserAds } from "./schemas";
import { AccountTypeSchema } from "../../admin/models/schema";

// -> model imports
import * as UserModels from "./User.model";
import AdminModel from "./Admin.model";
import AccountTypeModel from "../../admin/models/AccountType";

UserModels.default.init(
  UserSchema,
  sequelizeOptions({ modelName: "client_account", tableName: "client_account" })
);

UserModels.UserSubscription.init(
  Subscription,
  sequelizeOptions({ modelName: "subscription", tableName: "subscription" })
);

UserModels.UserAds.init(
  UserAds, sequelizeOptions({modelName:"user_ads", tableName:"user_ads"})
)

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
UserModels.UserSubscription.belongsTo(UserModels.default, { foreignKey: "userId" });

(async () => {
  await sequelizeOptions({ timestamps: true }).sequelize.sync();
})();

export { UserModels, AdminModel, AccountTypeModel };
