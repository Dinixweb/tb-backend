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
  AdminChangeLogSchema,
  FAQSchema,
  AboutSchema,
  PrivacySchema,
  TermsAndConditionSchema,
  CreatePointShema,
  TicketShema,
  PostReportedShema,
  UserSuspensionShema,
} from "./schemas";
import { AccountTypeSchema } from "../../admin/models/schema";

// -> model imports
import * as UserModels from "./User.model";
import * as AdminModel from "./Admin.model";
import AccountTypeModel from "../../admin/models/AccountType";
import {
  AddWishListSchema,
  ChangeLogSchema,
  ConnectionAwaitSchema,
  CreditSchema,
  FreeViewSchema,
  InterestListSchema,
  InterestValuesSchema,
  PaymentSchema,
  PointOfferSchema,
  ReferralCodeActivationSchema,
  ReferralCodeSchema,
  TokenSchema,
  TravelerSchema,
} from "./schemas/User.schema";

UserModels.default.init(
  UserSchema,
  sequelizeOptions({ modelName: "client_account", tableName: "client_account" })
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

AdminModel.default.init(
  AdminSchema,
  sequelizeOptions({ modelName: "admin_account", tableName: "admin_account" })
);

UserModels.TokensModel.init(
  TokenSchema,
  sequelizeOptions({ modelName: "tokens", tableName: "tokens" })
);

UserModels.TravelersModel.init(
  TravelerSchema,
  sequelizeOptions({ modelName: "travelers", tableName: "travelers" })
);

UserModels.ChangeLogModel.init(
  ChangeLogSchema,
  sequelizeOptions({ modelName: "user_logs", tableName: "user_logs" })
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

UserModels.UserSubscription.init(
  SubscriptionSchema,
  sequelizeOptions({ modelName: "subscription", tableName: "subscription" })
);

UserModels.UserAdViews.init(
  UserAdViewsSchema,
  sequelizeOptions({ modelName: "ad_view", tableName: "ad_view" })
);

UserModels.FreeViewModal.init(
  FreeViewSchema,
  sequelizeOptions({ modelName: "free_view", tableName: "free_view" })
);
UserModels.CreditModel.init(
  CreditSchema,
  sequelizeOptions({ modelName: "credits", tableName: "credit" })
);
UserModels.ReferralCodeModel.init(
  ReferralCodeSchema,
  sequelizeOptions({ modelName: "referral_code", tableName: "referral_code" })
);
UserModels.UserAds.init(
  UserAdsSchema,
  sequelizeOptions({ modelName: "user_ads", tableName: "user_ads" })
);

UserModels.ReferralCodeActivationModal.init(
  ReferralCodeActivationSchema,
  sequelizeOptions({
    modelName: "referral_code_active_list",
    tableName: "referral_code_active_list",
  })
);

UserModels.ConnectionAwaitModel.init(
  ConnectionAwaitSchema,
  sequelizeOptions({
    modelName: "connection_request",
    tableName: "connection_request",
  })
);
UserModels.AddWishListModel.init(
  AddWishListSchema,
  sequelizeOptions({ modelName: "wishlist", tableName: "wishlist" })
);

UserModels.Payments.init(
  PaymentSchema,
  sequelizeOptions({
    modelName: "payments",
    tableName: "payments",
  })
);

UserModels.InterestListModal.init(
  InterestListSchema,
  sequelizeOptions({ modelName: "interest_list", tableName: "interest_list" })
);
UserModels.InterestValuesModal.init(
  InterestValuesSchema,
  sequelizeOptions({
    modelName: "interest_values",
    tableName: "interest_values",
  })
);

AccountTypeModel.init(
  AccountTypeSchema,
  sequelizeOptions({
    modelName: "admin_accountTypes",
    tableName: "admin_accountTypes",
  })
);

AdminModel.AdminChangeLogModel.init(
  AdminChangeLogSchema,
  sequelizeOptions({ modelName: "admin_logs", tableName: "admin_logs" })
);

AdminModel.FAQPModel.init(
  FAQSchema,
  sequelizeOptions({ tableName: "faq", modelName: "faq" })
);
AdminModel.AboutModel.init(
  AboutSchema,
  sequelizeOptions({ tableName: "about", modelName: "about" })
);

AdminModel.PrivacyModel.init(
  PrivacySchema,
  sequelizeOptions({ tableName: "privacy", modelName: "privacy" })
);
AdminModel.TermsAndConditionModel.init(
  TermsAndConditionSchema,
  sequelizeOptions({
    tableName: "terms_and_condition",
    modelName: "terms_and_condition",
  })
);
AdminModel.CreatePoints.init(
  CreatePointShema,
  sequelizeOptions({ tableName: "point_offer", modelName: "point_offer" })
);

AdminModel.Tickets.init(
  TicketShema,
  sequelizeOptions({ tableName: "tickets", modelName: "tickets" })
);
AdminModel.PostReported.init(
  PostReportedShema,
  sequelizeOptions({ tableName: "post_reported", modelName: "post_reported" })
);
AdminModel.UserSuspension.init(
  UserSuspensionShema,
  sequelizeOptions({
    tableName: "user_suspension",
    modelName: "user_suspension",
  })
);

// table relationship

UserModels.default.hasOne(UserModels.Connections);
UserModels.Connections.belongsTo(UserModels.default);
UserModels.default.hasOne(UserModels.ShownInterestModel);
// Model Relationships
// AccountTypeModel.belongsTo(AdminModel, { foreignKey: "createdBy" });

UserModels.InterestListModal.hasMany(UserModels.InterestValuesModal);
UserModels.InterestValuesModal.belongsTo(UserModels.InterestListModal, {
  foreignKey: "interestId",
});

UserModels.ShownInterestModel.belongsTo(UserModels.default);

UserModels.SplitModel.hasMany(UserModels.UserInterested);
UserModels.UserInterested.belongsTo(UserModels.SplitModel);
// UserModels.UserSubscription.belongsTo(UserModels.default, {
//   foreignKey: "userId",
// });
//UserModels.UserAds.belongsTo(UserModels.default, { foreignKey: "userId" });

//UserModels.UserAds.hasOne(UserModels.ProfileImageUpload);
UserModels.ProfileImageUpload.belongsTo(UserModels.UserAds);

//UserModels.UserAds.hasMany(UserModels.ShownInterestModel);
UserModels.ShownInterestModel.belongsTo(UserModels.UserAds);
UserModels.UserAds.hasMany(UserModels.UserAdViews);
UserModels.UserAdViews.belongsTo(UserModels.UserAds);

(async () => {
  await sequelizeOptions({ timestamps: true }).sequelize.sync({ alter: false });
})();

export { UserModels, AdminModel, AccountTypeModel };
