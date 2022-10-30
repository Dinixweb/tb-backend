import { DataType, Model } from "sequelize";
import type { UUID } from "sequelize/types";
import type {
  AdViews,
  Feeds,
  IAccount,
  Subscription,
  ProfileImage,
  ShownInterest,
  ConnectionRequest,
  Splits,
  UserInterestedList,
  PasswordResetToken,
} from "../interfaces/user";

export default class User extends Model<IAccount> {
  declare userId: typeof UUID;
  declare email: string;
  declare firstName: string;
  declare lastname: string;
  declare phoneNumber: string;
  declare type: string;
  declare password: string;
  declare profileImage: string;
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
  declare postPrice: string;
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

export class Connection extends Model<ConnectionRequest> {
  declare connectionId: typeof UUID;
  declare defaultMessage: string;
  declare senderUserId: string;
  declare receiverUserId: string;
  declare requestStatus: string;
  declare isConnected: boolean;
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
