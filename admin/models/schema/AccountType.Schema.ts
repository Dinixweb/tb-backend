import { DataTypes } from "sequelize";

const AccountTypeSchema = {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  defaultType: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  // createdBy: {
  //   type: DataTypes.UUID,
  //   allowNull: false,
  //   references: {
  //     model: "admin_account",
  //     key: "id",
  //   },
  // },
};

export default AccountTypeSchema;
