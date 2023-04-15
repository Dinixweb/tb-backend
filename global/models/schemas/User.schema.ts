import { database } from "firebase-admin";
import { DataTypes } from "sequelize";

// User Profile
export const UserSchema = {
  userId: {
    type: DataTypes.STRING(225),
    allowNull: false,
    primaryKey: true,
    // defaultValue: DataTypes.UUIDV4,
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
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
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
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // referralCode: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: () => null,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isSuspended: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  suspendedDate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  suspensionReason: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  trust: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  identity: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  referralCount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  totalReferredUser: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  numberOfConnection: {
    type: DataTypes.INTEGER,
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
  advertId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  split: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  targetCity_1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  targetCity_2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  targetCity_3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  postTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  adRerunTimes: {
    type: DataTypes.BIGINT,
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

export const ConnectionsSchema = {
  connectionId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },

  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  connectionStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "pending",
  },
  user_2_Id: {
    type: DataTypes.STRING,
    allowNull: false,
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

//conection request
export const ConnectionRequestsSchema = {
  connectionRequestId: {
    type: DataTypes.STRING(225),
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  receiverId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senderId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  requestStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "pending",
  },
};

//conection await
export const ConnectionAwaitSchema = {
  connectionAwaitId: {
    type: DataTypes.STRING(225),
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  senderId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  requestStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "pending",
  },
  defaultMessage: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: "I would like to join your Wekanfly network",
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export const TokenSchema = {
  tokenId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiryTime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};

export const ReferralCodeSchema = {
  referralCodeId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  referralCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
};

export const ReferralCodeActivationSchema = {
  referralCodeActivationId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  referralCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  usedBy: {
    type: DataTypes.UUID,
    allowNull: false,
  },
};
export const CreditSchema = {
  creditId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  creditSource: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creditUnit: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  amount: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
};
export const FreeViewSchema = {
  freeViewId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  travellerId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  viewRemaining: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
};

export const PointOfferSchema = {
  offerId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  price: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  points: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  createdBy: DataTypes.STRING,
  allowNull: false,
};

export const TravelerSchema = {
  travellerId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  surName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pnrNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  airPlaneName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departureDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departureAirlineNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numberOfStops: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  flightClass: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  departureAirport: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  departureCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  flightEquipmentNo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  arrivalDateTime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  noOfPassenger: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  terminal: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  farePrice: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  totalSegmentDistance: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  segmentDistance: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  agentEmail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  agentName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  airlineName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  passengerTitle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pnrStatus: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "pending",
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dateFrom: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dateTo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  matchData: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};

export const InterestListSchema = {
  interestId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
};
export const InterestValuesSchema = {
  interestValuesId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  values: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  interestId: {
    type: DataTypes.UUID,
    allowNull: false,
    foreignKey: true,
  },
};
export const PaymentSchema = {
  paymentId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  amount: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    foreignKey: true,
  },
  created: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  referenceNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  canceled_at: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receipt_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export const AddWishListSchema = {
  wishlistId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  departureAirport: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dateFrom: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dateTo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  adminDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};

export const ChangeLogSchema = {
  logId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};
