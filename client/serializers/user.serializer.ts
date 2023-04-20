import { UserModels, AdminModel } from "global/models";

//user
export const UserSerializer = (data: UserModels.default) => {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    userId: data.userId,
    isActive: data.isActive,
  };
};

//admin
export const AdminSerializer = (data: AdminModel.default) => {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    employeeId: data.employeeId,
  };
};
