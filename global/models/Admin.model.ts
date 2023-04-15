import {
  AboutProps,
  AdminChangeLogProps,
  AdminUser,
  CreatePointProps,
  FAQProps,
  PostReportedProps,
  PrivacyProps,
  TermsAndConditionProps,
  TicketProps,
  UserSuspensionHistory,
} from "global/interfaces/admin";
import { Model, UUID } from "sequelize";

export default class AdminModel extends Model<AdminUser> {
  declare employeeId: typeof UUID;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare phoneNumber: number;
  declare userName: string;
  declare gender: string;
  declare password: string;
  declare dateOfBirth: string;
  declare nationality: string;
  declare address: string;
  declare jobInfo: string;
  declare jobTitle: string;
  declare salary: string;
  declare department: string;
  declare active?: boolean;
  declare type?: string;
  declare profileImage?: string;
  declare passwordRestToken?: string;
  declare tokenTimestamp?: string;
}
export class AdminChangeLogModel extends Model<AdminChangeLogProps> {
  declare logId: typeof UUID;
  declare employeeId: typeof UUID;
  declare action: string;
  declare createdBy: string;
}

export class FAQPModel extends Model<FAQProps> {
  declare faqId: typeof UUID;
  declare question: string;
  declare answer: string;
  declare media: string;
}
export class AboutModel extends Model<AboutProps> {
  declare aboutId: string;
  declare about: string;
}
export class PrivacyModel extends Model<PrivacyProps> {
  declare privacyId: string;
  declare privacy: string;
}
export class TermsAndConditionModel extends Model<TermsAndConditionProps> {
  declare id: string;
  declare termsAndCondition: string;
}

export class CreatePoints extends Model<CreatePointProps> {
  declare offerId: typeof UUID;
  declare price: string;
  declare points: string;
  declare createdBy: string;
}

export class Tickets extends Model<TicketProps> {
  declare id: typeof UUID;
  declare ticketId: string;
  declare userId: string;
  declare username: string;
  declare issueTitle: string;
  declare issueExpanation: string;
  declare submissionDate: string;
  declare assignedTo: string;
  declare comments: string;
  declare resolvedBy: string;
  declare ticketStatus: string;
  declare resolutionDate: string;
}

export class PostReported extends Model<PostReportedProps> {
  declare reportId: typeof UUID;
  declare username: string;
  declare userId: string;
  declare reporter: string;
  declare reasons: string;
  declare postId: string;
}
export class UserSuspension extends Model<UserSuspensionHistory> {
  declare id: typeof UUID;
  declare userId: string;
  declare username: string;
  declare reasonForSuspension: string;
}
