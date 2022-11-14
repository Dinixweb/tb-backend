import { DataTypes } from "sequelize";

// User Profile
export const UserSchema = {
  userId: {
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
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: () => true,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: () => false,
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: () => null,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};

// subscription schema
export const SubscriptionSchema = {
  subscriptionId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    foreignKey: true,
  },
  amount: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  subscriptionType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subscriptionDate: {
    type: DataTypes.DATE,
    allowNull: false,
    default: DataTypes.DATE,
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  subscriptionStatus: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
};

// feeds schema
export const UserAdsSchema = {
  postId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    foreignKey: true,
    allowNull: false,
  },
  postType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  postAddress: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  numberOfPersons: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  postPrice: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};

export const UserAdViewsSchema = {
  viewId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  viewCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
};

export const ProfileImageSchema = {
  imageId: {
    type: DataTypes.STRING,
    allowNull: true,
    primaryKey: true,
  },
  imageList: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
};

export const ShownInterestSchema = {
  interestId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  interestCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

export const ConnectionRequestSchema = {
  connectionId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  defaultMessage: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: "I would like to join your Wekanfly network",
  },
  senderUserId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receiverUserId: {
    type: DataTypes.STRING,
    allowNull: false,
    foreignKey: true,
  },
  requestStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "request pending",
  },
  isConnected: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
};

export const SplitSchema = {
  splitId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  postId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  adPrice: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paidAmount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export const UserInterestedSchema = {
  userInterestedId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  paidAmount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  requestStatus: {
    type: DataTypes.BOOLEAN,
    allowNul: false,
    defaultValue: false,
  },
};

export const ResetPasswordToken = {
  tokenId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resetToken: {
    type: DataTypes.STRING(225),
    allowNull: true,
  },
  tokenTimestamp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};

export const IndentitySchema = {
  identityId: {
    type: DataTypes.STRING(225),
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  identityType: {
    type: DataTypes.STRING(225),
    allowNull: false,
  },
  identity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiryDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  identityNumber: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  identityStatus: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "pending",
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
};
