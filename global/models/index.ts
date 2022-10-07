import { sequelizeOptions } from "../database";

// -> schema imports
import { UserSchema, AdminSchema, SubscriptionSchema, UserAdsSchema, UserAdViewsSchema, ProfileImageSchema,ShownInterestSchema } from "./schemas";
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

UserModels.ProfileImageUpload.init(
  ProfileImageSchema, sequelizeOptions({modelName:"profile_images", tableName:"profile_images"})
)

UserModels.ShownInterestModel.init(
  ShownInterestSchema, sequelizeOptions({modelName:"shown_interest", tableName:"shown_interest"})
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

UserModels.UserAds.hasMany(UserModels.UserAdViews);
UserModels.UserAdViews.belongsTo(UserModels.UserAds);

UserModels.UserAds.belongsTo(UserModels.default, { foreignKey: "userId" });

UserModels.UserAds.hasOne(UserModels.ProfileImageUpload);
UserModels.ProfileImageUpload.belongsTo(UserModels.UserAds);

UserModels.UserAds.hasMany(UserModels.ShownInterestModel);
UserModels.ShownInterestModel.belongsTo(UserModels.UserAds);


(async () => {
  await sequelizeOptions({ timestamps: true }).sequelize.sync({ alter: true, force: true  });
})();

export { UserModels, AdminModel, AccountTypeModel };
