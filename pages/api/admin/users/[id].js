import nc from "next-connect";
import mongoDBConnect from "../../../../config/db";
import {
  updateUserDetailsAdmin,
  getUserDetailsAdmin,
  deleteUserAdmin,
} from "../../../../controllers/authController";
import onError from "../../../../middlewares/onError";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../../../../middlewares/auth";

const handler = nc({ onError });

mongoDBConnect();

handler
  .use(isAuthenticatedUser, authorizeRoles("admin"))
  .get(getUserDetailsAdmin);
handler
  .use(isAuthenticatedUser, authorizeRoles("admin"))
  .put(updateUserDetailsAdmin);

handler
  .use(isAuthenticatedUser, authorizeRoles("admin"))
  .delete(deleteUserAdmin);

export default handler;
