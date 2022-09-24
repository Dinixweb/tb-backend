export const UserSerializer = (data) => {
  return {
    email: data.email,
    id: data.id,
    isVerified: data.isVerified,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};
