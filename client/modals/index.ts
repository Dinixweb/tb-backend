import { sequelizeOptions } from "../../global/database";
import { UserSchema } from "./schemas";

import UserModal from "./User.modal";

UserModal.init(
  UserSchema,
  sequelizeOptions({ modelName: "account", tableName: "accounts" })
);

// sync all modals
(async () => {
  await sequelizeOptions({ timestamps: true }).sequelize.sync({
    logging: console.log,
  });
})();

export { UserModal };
