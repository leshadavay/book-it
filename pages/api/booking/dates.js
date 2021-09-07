import nc from "next-connect";
import mongoDBConnect from "../../../config/db";
import { getBookedDatesOfRoom } from "../../../controllers/bookingController";

import onError from "../../../middlewares/onError";

mongoDBConnect();

const handler = nc({ onError });

handler.get(getBookedDatesOfRoom);

export default handler;
