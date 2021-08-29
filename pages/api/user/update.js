import nc from "next-connect";
import mongoDBConnect from "../../../config/db";
import { updateUserProfile } from "../../../controllers/authController";
import { isAuthenticatedUser } from "../../../middlewares/auth";
import onError from "../../../middlewares/onError";

mongoDBConnect();

const handler = nc({ onError });

handler.use(isAuthenticatedUser).put(updateUserProfile);

export default handler;
