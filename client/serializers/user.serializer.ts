import { UserModels } from "global/models";

export const UserSerializer = (data: UserModels.default) => {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    userId: data.userId,
    isActive: data.isActive,
  };
};
