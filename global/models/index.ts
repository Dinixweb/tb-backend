import { sequelizeOptions } from "../database";

// -> schema imports
import {
  UserSchema,
  AdminSchema,
  SubscriptionSchema,
  UserAdsSchema,
  UserAdViewsSchema,
  ProfileImageSchema,
  ShownInterestSchema,
  ConnectionsSchema,
  UserInterestedSchema,
  SplitSchema,
  ResetPasswordToken,
  IndentitySchema,
} from "./schemas";
import { AccountTypeSchema } from "../../admin/models/schema";

// -> model imports
import * as UserModels from "./User.model";
import AdminModel from "./Admin.model";
import AccountTypeModel from "../../admin/models/AccountType";
import { ConnectionAwaitSchema, TokenSchema } from "./schemas/User.schema";

UserModels.default.init(
  UserSchema,
  sequelizeOptions({ modelName: "client_account", tableName: "client_account" })
);

UserModels.UserSubscription.init(
  SubscriptionSchema,
  sequelizeOptions({ modelName: "subscription", tableName: "subscription" })
);

UserModels.UserAds.init(
  UserAdsSchema,
  sequelizeOptions({ modelName: "user_ads", tableName: "user_ads" })
);

UserModels.UserAdViews.init(
  UserAdViewsSchema,
  sequelizeOptions({ modelName: "ad_view", tableName: "ad_view" })
);

UserModels.ResetPasswordModel.init(
  ResetPasswordToken,
  sequelizeOptions({
    modelName: "password_reset_tokens",
    tableName: "password_reset_tokens",
  })
);
UserModels.IdentityModel.init(
  IndentitySchema,
  sequelizeOptions({
    modelName: "indentity_verification",
    tableName: "indentity_verification",
  })
);

UserModels.ProfileImageUpload.init(
  ProfileImageSchema,
  sequelizeOptions({ modelName: "profile_images", tableName: "profile_images" })
);

UserModels.SplitModel.init(
  SplitSchema,
  sequelizeOptions({ modelName: "split_list", tableName: "split_list" })
);

UserModels.UserInterested.init(
  UserInterestedSchema,
  sequelizeOptions({
    modelName: "User_interest_list",
    tableName: "user_interest_list",
  })
);

UserModels.ShownInterestModel.init(
  ShownInterestSchema,
  sequelizeOptions({ modelName: "shown_interest", tableName: "shown_interest" })
);
UserModels.Connections.init(
  ConnectionsSchema,
  sequelizeOptions({ modelName: "connections", tableName: "connections" })
);

UserModels.ConnectionAwaitModel.init(
  ConnectionAwaitSchema,
  sequelizeOptions({
    modelName: "connection_request",
    tableName: "connection_request",
  })
);

AdminModel.init(
  AdminSchema,
  sequelizeOptions({ modelName: "admin_account", tableName: "admin_account" })
);

UserModels.TokensModel.init(
  TokenSchema,
  sequelizeOptions({ modelName: "tokens", tableName: "tokens" })
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
UserModels.UserSubscription.belongsTo(UserModels.default, {
  foreignKey: "userId",
});

UserModels.UserAds.hasMany(UserModels.UserAdViews);
UserModels.UserAdViews.belongsTo(UserModels.UserAds);

UserModels.UserAds.belongsTo(UserModels.default, { foreignKey: "userId" });

UserModels.UserAds.hasOne(UserModels.ProfileImageUpload);
UserModels.ProfileImageUpload.belongsTo(UserModels.UserAds);

UserModels.UserAds.hasMany(UserModels.ShownInterestModel);
UserModels.ShownInterestModel.belongsTo(UserModels.UserAds);
UserModels.default.hasOne(UserModels.ShownInterestModel);
UserModels.ShownInterestModel.belongsTo(UserModels.default);

UserModels.default.hasOne(UserModels.Connections);
UserModels.Connections.belongsTo(UserModels.default);

UserModels.SplitModel.hasMany(UserModels.UserInterested);
UserModels.UserInterested.belongsTo(UserModels.SplitModel);

(async () => {
  await sequelizeOptions({ timestamps: true }).sequelize.sync();
})();

export { UserModels, AdminModel, AccountTypeModel };
