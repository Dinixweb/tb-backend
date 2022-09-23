import { sequelizeOptions } from "../database";
import { UserSchema, AdminSchema } from "./schemas";

import UserModel from "./User.model";
import AdminModel from "./Admin.model";
UserModel.init(
  UserSchema,
  sequelizeOptions({ modelName: "client_account", tableName: "client_account" })
);

AdminModel.init(
  AdminSchema,
  sequelizeOptions({ modelName: "admin_account", tableName: "admin_account" })
);

// sync all modals
(async () => {
  await sequelizeOptions({ timestamps: true }).sequelize.sync();
})();

export { UserModel, AdminModel };
