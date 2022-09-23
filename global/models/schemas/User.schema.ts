import { DataTypes } from "sequelize";

export const UserSchema = {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    default: () => true,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    default: () => false,
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true,
    default: () => null,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};
