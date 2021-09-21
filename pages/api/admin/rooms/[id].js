import nc from "next-connect";
import mongoDBConnect from "../../../../config/db";
import {
  deleteRoomAdmin,
  updateRoomAdmin,
} from "../../../../controllers/roomController";
import onError from "../../../../middlewares/onError";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../../../../middlewares/auth";

const handler = nc({ onError });

mongoDBConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).put(updateRoomAdmin);
handler
  .use(isAuthenticatedUser, authorizeRoles("admin"))
  .delete(deleteRoomAdmin);

export default handler;
