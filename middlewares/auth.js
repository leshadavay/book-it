import { getSession } from "next-auth/client";
import ErrorHandler from "../utils/errorHandler";
import tryCatchAsyncErrors from "./tryCatchAsyncErrors";

//check if user has logged in
const isAuthenticatedUser = tryCatchAsyncErrors(async (req, res, next) => {
  const session = await getSession({ req });

  if (!session) {
    return next(new ErrorHandler("Please Login first", 401));
  }
  req.user = session.user;
  next();
});

//handle user roles (admin/user)
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`Access forbidden`, 403));
    }
    next();
  };
};

export { isAuthenticatedUser, authorizeRoles };
