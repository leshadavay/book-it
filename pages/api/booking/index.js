import nc from "next-connect";
import mongoDBConnect from "../../../config/db";
import { newBooking } from "../../../controllers/bookingController";
import { isAuthenticatedUser } from "../../../middlewares/auth";
import onError from "../../../middlewares/onError";

mongoDBConnect();

const handler = nc({ onError });

handler.use(isAuthenticatedUser).post(newBooking);

export default handler;
