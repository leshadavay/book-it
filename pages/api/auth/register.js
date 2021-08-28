import nc from "next-connect";
import mongoDBConnect from "../../../config/db";
import onError from "../../../middlewares/onError";
import { registerUser } from "../../../controllers/authController";

const handler = nc({ onError });

mongoDBConnect();

handler.post(registerUser);

export default handler;
