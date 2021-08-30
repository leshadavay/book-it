import nc from "next-connect";
import mongoDBConnect from "../../../config/db";
import { forgotUserPassword } from "../../../controllers/authController";

import onError from "../../../middlewares/onError";

mongoDBConnect();

const handler = nc({ onError });

handler.post(forgotUserPassword);

export default handler;
