import { UserModels } from "global/models";

export const UserSerializer = (data:UserModels.default) => {
  return {
    firstName:data.firstName,
    email: data.email,
    userId: data.userId,
    isActive: data.isActive,
  };
};
