import { string } from "joi";
import { UUID } from "sequelize/types";

export interface IAccount {
  userId?: typeof UUID;
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  photoImage?: string;
  isActive?: boolean;
  password?: string;
  profileImage?: string;
  userName?: string;
  gender?: string;
  nationality: string;
  isSuspended?: boolean;
  suspendedDate?: string;
  suspensionReason: string;
  trust: string;
  // referralCode?: string;
  description?: string;
  identity?: unknown;
  referralCount?: number;
  totalReferredUser?: number;
  numberOfConnection?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface Subscription {
  subscriptionId: typeof UUID;
  userId: typeof UUID;
  amount: number | string;
  subscriptionType: string;
  subscriptionDate: Date;
  expiryDate: Date;
  subscriptionStatus: boolean;
}

export interface CreditUnit {
  creditUnitId: typeof UUID;
  subscriptionId: typeof UUID;
  units: number;
}

export interface Feeds {
  postId: string;
  userId: typeof UUID;
  postTitle: string;
  postType: string;
  postDescription: string;
  postImage?: string;
  postAddress: string;
  link: string;
  postPrice: number;
  numberOfPersons: number;
  advertId: string;
  split: string;
  targetCity_1?: string;
  targetCity_2?: string;
  targetCity_3?: string;
  noOfDaye: number;
  deletedAt?: Date;
  adRerunTimes?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface Ads extends Feeds {
  adId: typeof UUID;
  adView?: AdViews[];
}

interface AdViews {
  viewId: typeof UUID;
  viewCount: number;
  userId: typeof UUID;
  createdAt?: Date;
}

export interface Travels {
  travelId: typeof UUID;
  userId: typeof UUID;
  location: string;
  destination: string;
  flightDate: Date;
  travelRoutes: TravelRoutes[];
}

export interface TravelRoutes {
  routeId: typeof UUID;
  travelId: typeof UUID;
  routes: string;
}

export interface ProfileImage {
  imageId: string;
  imageList: string;
}

export interface ShownInterest {
  interestId: typeof UUID;
  location: string;
  interestCount: number;
}

export interface ConnectionList {
  firstName: string;
  lastName: string;
  userId: typeof UUID;
  connectionId: string;
  user_2_Id: string;
  connectionStatus: string;
}

export type Splits = {
  splitId: typeof UUID;
  userId: string;
  postId: string;
  adPrice: string;
  paidAmount: string;
};

export type UserInterestedList = {
  userInterestedId: typeof UUID;
  userId: string;
  paidAmount: string;
  requestStatus: boolean;
};

export interface PasswordResetToken {
  tokenId: typeof UUID;
  userId: string;
  resetToken: string;
  tokenTimestamp: string;
}

export interface IndentityVerification {
  identityId: string;
  userId: typeof UUID;
  identityType?: string;
  identity?: string;
  expiryDate?: string;
  identityNumber?: number;
  identityStatus?: string;
  comment?: string;
}

export interface ConnectionAwaitList {
  connectionAwaitId: typeof UUID;
  senderId: typeof UUID;
  userId?: typeof UUID;
  requestStatus: string;
  firstName: string;
  lastName: string;
  defaultMessage: string;
}

export interface ConnectionRequestList {
  connectionRequestId: typeof UUID;
  receiverId: string;
  senderId: string;
  requestStatus: string;
  firstName: string;
  lastName: string;
}

export interface Tokens {
  tokenId: typeof UUID;
  userId: string;
  otp: string;
  email: string;
  expiryTime: string;
  phoneNumber?: string;
}

export interface WishList {
  wishlistId: typeof UUID;
  userId: string;
  departure: string;
  destination: string;
  dateFrom: string;
  dateTo: string;
}

export interface Travelers {
  /*required start*/
  travellerId: typeof UUID;
  userId: typeof UUID;
  firstName: string;
  surName: string;
  pnrNumber: string;
  airPlaneName: string;
  departureDate: string;
  departureAirlineNumber: string;
  numberOfStops: number;
  /*required end*/
  flightClass: string;
  departureAirport: string;
  departureCode: string;
  flightEquipmentNo: number;
  arrivalDateTime: string;
  segmentDistance: string;
  noOfPassenger: number;
  terminal: string;
  farePrice: number;
  totalSegmentDistance: string;
  agentEmail?: string;
  agentName?: string;
  airlineEmail?: string;
  passengerTitle?: string;
  pnrStatus: string;
  destination?: string;
  dateFrom?: string;
  dateTo?: string;
  image?: string;
  matchData?: unknown;
}

export interface ReferralCode {
  referralCodeId: typeof UUID;
  referralCode: string;
  userId: string;
  dateCreated?: string;
  dateUpdated?: string;
}

export interface ReferralCodeActivation {
  referralCodeActivationId: typeof UUID;
  referralCode: string;
  createdBy: string;
  usedBy: string;
  dateCreated?: string;
  dateUpdated?: string;
}
export interface Credits {
  creditId: typeof UUID;
  userId: string;
  creditSource: string;
  creditUnit: number;
  amount?: number;
}

export interface FreeView {
  freeViewId: typeof UUID;
  userId: typeof UUID;
  travellerId: typeof UUID;
  viewRemaining: number;
}

export interface PointOffers {
  offerId: typeof UUID;
  points: number;
  price: number;
}
export interface InterestList {
  interestId: typeof UUID;
  userId: typeof UUID;
}
export interface InterestValues {
  interestValuesId: typeof UUID;
  values: string;
  interestId: typeof UUID;
}

export interface PaymentProps {
  paymentId: typeof UUID;
  amount: number;
  userId: typeof UUID;
  created: string;
  referenceNo: string;
  canceled_at: string;
  currency: string;
  paymentMethod: string;
  status: string;
  receipt_email: string;
}

export interface AddWishListProps {
  wishlistId: typeof UUID;
  departureAirport: string;
  userId: typeof UUID;
  destination: string;
  dateFrom: string;
  dateTo: string;
  userDeleted: boolean;
  adminDeleted: boolean;
}

export interface UserChangeLogProps {
  logId: typeof UUID;
  userId: typeof UUID;
  action: string;
}
