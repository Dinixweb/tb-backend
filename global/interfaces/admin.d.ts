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

export enum portalRef {
  web = "web-client",
  mobile = "mobile-client",
}

export type portalTypes = portalRef.web | portalRef.mobile;
