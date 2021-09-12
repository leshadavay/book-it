import nc from "next-connect";
import mongoDBConnect from "../../../config/db";
import { getBookingDetails } from "../../../controllers/bookingController";
import { isAuthenticatedUser } from "../../../middlewares/auth";

import onError from "../../../middlewares/onError";

mongoDBConnect();

const handler = nc({ onError });

handler.use(isAuthenticatedUser).get(getBookingDetails);

export default handler;
