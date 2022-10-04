import { UUID } from "sequelize/types";

export interface IAccount {
  userId: typeof UUID;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isActive?: boolean;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}


export interface Subscription  {
    subscriptionId:typeof UUID;
    userId: typeof UUID;
    amount: number|string;
    subscriptionType: string;
    subscriptionDate: Date
    expiryDate: Date
    subscriptionStatus: boolean;
}

export interface CreditUnit {
  creditUnitId: typeof UUID;
  subscriptionId: typeof UUID
  units: number;
}

export interface Feeds{
  postId: string;
  userId: typeof UUID;
  postTitle: string;
  postType: string;
  postDescription: string;
  postImage?: string;
  postAddress: string;
  postPrice: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface Ads extends Feeds {
  deletedAt: Date
  adView?:AdViews[]
}

interface AdViews{
  viewId: typeof UUID
  viewCount: number;
  userId: typeof UUID;
  createdAt?: Date
}

export interface Travels{
  travelId: typeof UUID;
  userId: typeof UUID;
  location: string;
  destination: string;
  flightDate: Date;
  travelRoutes:TravelRoutes[]
}

export interface TravelRoutes{
  routeId: typeof UUID;
  travelId: typeof UUID;
  routes:string
}

export interface ProfileImage{
  imageId: string;
  imageList:string
}