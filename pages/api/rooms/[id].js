import nc from "next-connect";
import mongoDBConnect from "../../../config/db";
import onError from "../../../middlewares/onError";
import {
  getRoomDetails,
  updateRoomDetails,
  deleteRoomDetails,
} from "../../../controllers/roomController";

const handler = nc({ onError });

mongoDBConnect();

handler.get(getRoomDetails);

handler.put(updateRoomDetails);

handler.delete(deleteRoomDetails);

export default handler;
