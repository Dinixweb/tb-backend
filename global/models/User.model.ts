import { DataType, Model } from "sequelize";
import type { UUID } from "sequelize/types";
import type {
  AdViews,
  Feeds,
  IAccount,
  Subscription,
  ProfileImage,
  ShownInterest,
  Splits,
  UserInterestedList,
  PasswordResetToken,
  IndentityVerification,
  ConnectionRequestList,
  ConnectionAwaitList,
  ConnectionList,
  Tokens,
  ReferralCode,
  ReferralCodeActivation,
  Credits,
  FreeView,
} from "../interfaces/user";

export default class User extends Model<IAccount> {
  declare userId: typeof UUID;
  declare email: string;
  declare firstName: string;
  declare lastName: string;
  declare phoneNumber: string;
  declare type: string;
  declare password: string;
  declare profileImage: string;
  declare description: string;
  declare gender: string;
  declare userName: string;
  // declare referralCode: string;
  declare isActive: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;
}

export class UserSubscription extends Model<Subscription> {
  declare subscriptionId: typeof UUID;
  declare userId: typeof UUID;
  declare amount: number | string;
  declare subscriptionType: string;
  declare subscriptionDate: Date;
  declare expieryDate: Date;
  declare subscriptionStatus: boolean;
}

export class UserAds extends Model<Feeds> {
  declare postId: typeof UUID;
  declare Images: ProfileImageUpload;
  declare userId: typeof UUID;
  declare postTitle: string;
  declare postType: string;
  declare postDescription: string;
  declare numberOfPersons: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare postAddress: string;
  declare link: string;
  declare postPrice: number;
}
export class UserAdViews extends Model<AdViews> {
  declare viewId: typeof UUID;
  declare viewCount: number;
  declare userId: typeof UUID;
  declare createdAt: Date;
}

export class ProfileImageUpload extends Model<ProfileImage> {
  declare imageId: string;
  declare imageList: string;
}

export class ShownInterestModel extends Model<ShownInterest> {
  declare interestId: typeof UUID;
  declare location: string;
  declare interestCount: number;
  userAdPostId: string;
  clientAccountUserId: string;
}

export class Connections extends Model<ConnectionList> {
  declare firstName: string;
  declare lastName: string;
  declare userId: typeof UUID;
  declare connectionId: string;
  declare user_2_Id: string;
  declare connectionStatus: string;
}

export class SplitModel extends Model<Splits> {
  declare splitId: typeof UUID;
  declare userId: string;
  declare adPrice: string;
  declare postId: string;
  declare paidAmount: string;
}

export class UserInterested extends Model<UserInterestedList> {
  declare userInterestedId: typeof UUID;
  declare userId: string;
  declare paidAmount: string;
  declare requestStatus: boolean;
}

export class ResetPasswordModel extends Model<PasswordResetToken> {
  declare tokenId: typeof UUID;
  declare userId: string;
  declare resetToken: string;
  declare tokenTimestamp: string;
}

export class IdentityModel extends Model<IndentityVerification> {
  declare identityId: string;
  declare userId: string;
  declare identityType: string;
  declare identity: string;
  declare expiryDate: string;
  declare identityNumber: number;
  declare identityStatus: string;
  declare comment: string;
}

export class ConnectionRequestModel extends Model<ConnectionRequestList> {
  declare connectionRequestId: typeof UUID;
  declare receiverId: string;
  declare senderId: string;
  declare requestStatus: string;
}

export class ConnectionAwaitModel extends Model<ConnectionAwaitList> {
  declare connectionAwaitId: typeof UUID;
  declare userId: typeof UUID;
  declare senderId: typeof UUID;
  declare requestStatus: string;
  declare defaultMesage: string;
}

export class TokensModel extends Model<Tokens> {
  declare tokenId: typeof UUID;
  declare userId: string;
  declare otp: string;
  declare email: string;
  declare expiryTime?: string;
  declare phoneNumber?: string;
}

export class ReferralCodeModel extends Model<ReferralCode> {
  declare referralCodeId: typeof UUID;
  declare referralCode: string;
  declare userId: string;
  declare dateCreated: string;
  declare dateUpdated: string;
}

export class ReferralCodeActivationModal extends Model<ReferralCodeActivation> {
  declare referralCodeActivationId: typeof UUID;
  declare referralCode: string;
  declare createdBy: string;
  declare usedBy: string;
  declare dateCreated: string;
  declare dateUpdated: string;
}
export class CreditModel extends Model<Credits> {
  declare creditId: typeof UUID;
  declare userId: string;
  declare creditSource: string;
  declare creditUnit: number;
}
export class FreeViewModal extends Model<FreeView> {
  declare freeViewId: typeof UUID;
  declare userId: string;
  declare travellerId: string;
  declare viewRemianing: number;
}
