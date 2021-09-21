import nc from "next-connect";
import mongoDBConnect from "../../../../config/db";
import { getAllBookingsAdmin } from "../../../../controllers/bookingController";
import onError from "../../../../middlewares/onError";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../../../../middlewares/auth";

const handler = nc({ onError });

mongoDBConnect();

handler
  .use(isAuthenticatedUser, authorizeRoles("admin"))
  .get(getAllBookingsAdmin);

export default handler;
