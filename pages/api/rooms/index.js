import nc from "next-connect";
import mongoDBConnect from "../../../config/db";
import onError from "../../../middlewares/onError";
import { allRooms, newRoom } from "../../../controllers/roomController";

const handler = nc({ onError });

mongoDBConnect();

handler.get(allRooms);
handler.post(newRoom);

export default handler;
