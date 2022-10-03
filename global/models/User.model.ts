import { Model } from "sequelize";
import type { UUID } from "sequelize/types";
import type { AdViews, Feeds, IAccount, Subscription} from "../interfaces/user";

export default class User extends Model<IAccount> {
    declare userId: typeof UUID;
    declare email: string;
    declare firstName: string;
    declare lastname: string;
    declare phoneNumber: string;
    declare type: string;
    declare password: string;
    declare isActive: boolean;
    declare createdAt: Date;
    declare updatedAt: Date;
}

export class UserSubscription extends Model<Subscription>{
    declare subscriptionId:typeof UUID;
    declare userId: typeof UUID;
    declare amount: number|string;
    declare subscriptionType: string;
    declare subscriptionDate: Date
    declare expieryDate: Date
    declare subscriptionStatus: boolean;
}

export class UserAds extends Model<Feeds>{
    declare  adId: typeof UUID;
    declare  userId: typeof UUID;
    declare  adTitle: string;
    declare  adType: string;
    declare  adDescription: string;
    declare  createdAt: Date;
    declare  updatedAt: Date;
}
export class UserAdViews extends Model<AdViews>{
    declare viewId: typeof UUID
    declare adId: typeof UUID;
    declare viewCount: number;
    declare userId: typeof UUID;
    declare createdAt: Date
}

