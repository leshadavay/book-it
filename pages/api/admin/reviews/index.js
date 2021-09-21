import nc from "next-connect";
import mongoDBConnect from "../../../../config/db";
import {
  deleteRoomReviewAdmin,
  getRoomReviewAdmin,
} from "../../../../controllers/roomController";
import onError from "../../../../middlewares/onError";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../../../../middlewares/auth";

const handler = nc({ onError });

mongoDBConnect();

handler
  .use(isAuthenticatedUser, authorizeRoles("admin"))
  .get(getRoomReviewAdmin);

handler
  .use(isAuthenticatedUser, authorizeRoles("admin"))
  .delete(deleteRoomReviewAdmin);

export default handler;
