import nc from "next-connect";
import mongoDBConnect from "../../../config/db";
import errorReport from "../../../middlewares/errorReport";
import { allRooms, newRoom } from "../../../controllers/roomController";

const handler = nc({ onError: errorReport });

mongoDBConnect();

handler.get(allRooms);
handler.post(newRoom);

export default handler;
