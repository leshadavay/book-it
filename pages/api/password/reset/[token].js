import nc from "next-connect";
import mongoDBConnect from "../../../../config/db";
import { resetUserPassword } from "../../../../controllers/authController";
import onError from "../../../../middlewares/onError";

mongoDBConnect();

const handler = nc({ onError });

handler.put(resetUserPassword);

export default handler;
