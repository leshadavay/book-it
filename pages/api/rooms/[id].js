import nc from "next-connect";
import mongoDBConnect from "../../../config/db";
import errorReport from "../../../middlewares/errorReport";
import {
  getRoomDetails,
  updateRoomDetails,
  deleteRoomDetails,
} from "../../../controllers/roomController";

const handler = nc({ onError: errorReport });

mongoDBConnect();

handler.get(getRoomDetails);

handler.put(updateRoomDetails);

handler.delete(deleteRoomDetails);

export default handler;
