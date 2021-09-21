import nc from "next-connect";
import mongoDBConnect from "../../../../config/db";
import onError from "../../../../middlewares/onError";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../../../../middlewares/auth";
import { getAllUsersAdmin } from "../../../../controllers/authController";

const handler = nc({ onError });

mongoDBConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(getAllUsersAdmin);

export default handler;
