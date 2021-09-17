import nc from "next-connect";
import mongoDBConnect from "../../../../config/db";
import {
  createRoomAdmin,
  getAllRoomsAdmin,
} from "../../../../controllers/roomController";
import onError from "../../../../middlewares/onError";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../../../../middlewares/auth";

const handler = nc({ onError });

mongoDBConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(getAllRoomsAdmin);
handler.use(isAuthenticatedUser, authorizeRoles("admin")).post(createRoomAdmin);

export default handler;
