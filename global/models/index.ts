import { sequelizeOptions } from "../database";

// -> schema imports
import { UserSchema, AdminSchema, SubscriptionSchema, UserAdsSchema, UserAdViewsSchema } from "./schemas";
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
  SubscriptionSchema,
  sequelizeOptions({ modelName: "subscription", tableName: "subscription" })
);

UserModels.UserAds.init(
  UserAdsSchema, sequelizeOptions({modelName:"user_ads", tableName:"user_ads"})
)

UserModels.UserAdViews.init(
  UserAdViewsSchema, sequelizeOptions({modelName:"ad_view", tableName:"ad_view"})
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

UserModels.UserAdViews.belongsTo(UserModels.UserAds, { foreignKey: "adId" });

UserModels.UserAds.belongsTo(UserModels.default, { foreignKey: "userId" });

(async () => {
  await sequelizeOptions({ timestamps: true }).sequelize.sync();
})();

export { UserModels, AdminModel, AccountTypeModel };
