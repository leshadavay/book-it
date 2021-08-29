import nc from "next-connect";
import mongoDBConnect from "../../../config/db";
import { currentUserProfile } from "../../../controllers/authController";
import { isAuthenticatedUser } from "../../../middlewares/auth";
import onError from "../../../middlewares/onError";

mongoDBConnect();

const handler = nc({ onError });

handler.use(isAuthenticatedUser).get(currentUserProfile);

export default handler;
