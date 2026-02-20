export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();

  res.status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message,
      user,
    });
};