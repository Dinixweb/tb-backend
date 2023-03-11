import { AdminChangeLogProps, AdminUser } from "global/interfaces/admin";
import { Model, UUID } from "sequelize";
import Client from "./User.model";

export default class AdminModel extends Model<AdminUser> {
  declare employeeId: typeof UUID;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare phoneNumber: number;
  declare userName: string;
  declare password: string;
  declare age: string;
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
  declare userId: typeof UUID;
  declare action: string;
}
