import { getSession } from "next-auth/client";
import ErrorHandler from "../utils/errorHandler";
import tryCatchAsyncErrors from "./tryCatchAsyncErrors";

const isAuthenticatedUser = tryCatchAsyncErrors(async (req, res, next) => {
  const session = await getSession({ req });

  if (!session) {
    return next(new ErrorHandler("Please Login first", 401));
  }
  req.user = session.user;
  next();
});

export { isAuthenticatedUser };
