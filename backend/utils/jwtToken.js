export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();

  res.status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,          // REQUIRED for Vercel
      sameSite: "none",      // REQUIRED for cross-domain
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .json({
      success: true,
      message,
      user,
    });
};