import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(new ErrorHandler("No authorization header", 401));
    }

    if (!authHeader.startsWith("Bearer ")) {
      return next(new ErrorHandler("Invalid authorization format", 401));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(new ErrorHandler("Token missing", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded?.id) {
      return next(new ErrorHandler("Invalid token payload", 401));
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorHandler("User not found", 401));
    }

    req.user = user;
    next();

  } catch (error) {
    console.log("AUTH ERROR:", error.message);
    return next(new ErrorHandler("Authentication failed", 401));
  }
});