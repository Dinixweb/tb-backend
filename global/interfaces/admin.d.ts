import type { UUID } from "sequelize/types";
// admin interface

interface AdminUser {
  employeeId: typeof UUID;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  userName: string;
  password: string;
  active?: boolean;
  type?: string;
  profileImage?: string;
  passwordRestToken?: string;
  tokenTimestamp?: string;
  age: string;
  nationality: string;
  address: string;
  jobInfo?: string;
  jobTitle?: string;
  salary?: string;
  department: string;
}

interface AdminUserAuth extends AdminUser {
  token: string;
  refreshToken: string;
}

interface IAcountType {
  id: typeof UUID;
  label: string;
  key: string;
  createdBy?: null | string;
}
export interface AdminChangeLogProps {
  logId: typeof UUID;
  userId: typeof UUID;
  action: string;
}

export interface FAQProps {
  faqId: typeof UUID;
  question: string;
  answer: string;
  media: string;
}
export interface AboutProps {
  aboutId: string;
  about: string;
}
export interface PrivacyProps {
  privacyId: string;
  privacy: string;
}
export interface TermsAndConditionProps {
  id: string;
  termsAndCondition: string;
}

export enum portalRef {
  web = "web-client",
  mobile = "mobile-client",
}

export type portalTypes = portalRef.web | portalRef.mobile;
