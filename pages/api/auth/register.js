import nc from "next-connect";
import mongoDBConnect from "../../../config/db";
import errorReport from "../../../middlewares/errorReport";
import { registerUser } from "../../../controllers/authController";

const handler = nc({ onError: errorReport });

mongoDBConnect();

handler.post(registerUser);

export default handler;
