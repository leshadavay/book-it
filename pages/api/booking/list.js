import nc from "next-connect";
import mongoDBConnect from "../../../config/db";
import { getMyBookings } from "../../../controllers/bookingController";
import { isAuthenticatedUser } from "../../../middlewares/auth";

import onError from "../../../middlewares/onError";

mongoDBConnect();

const handler = nc({ onError });

handler.use(isAuthenticatedUser).get(getMyBookings);

export default handler;
