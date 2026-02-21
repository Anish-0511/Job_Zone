export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();

  res.status(statusCode).json({
    success: true,
    message,
    user,
    token,
  });
};