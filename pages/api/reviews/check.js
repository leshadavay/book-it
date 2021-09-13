import nc from "next-connect";
import mongoDBConnect from "../../../config/db";
import onError from "../../../middlewares/onError";
import { checkReviewAvailability } from "../../../controllers/roomController";
import { isAuthenticatedUser } from "../../../middlewares/auth";
const handler = nc({ onError });

mongoDBConnect();

handler.use(isAuthenticatedUser).get(checkReviewAvailability);

export default handler;
