import nc from "next-connect";
import mongoDBConnect from "../../../config/db";
import { checkBookingAvailability } from "../../../controllers/bookingController";

import onError from "../../../middlewares/onError";

mongoDBConnect();

const handler = nc({ onError });

handler.get(checkBookingAvailability);

export default handler;
