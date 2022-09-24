export const UserSerializer = (data) => {
  return {
    email: data.email,
    id: data.id,
    isVerified: data.isVerified,
    type: data.type,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};
