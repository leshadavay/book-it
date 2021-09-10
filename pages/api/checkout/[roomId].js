import nc from "next-connect";
import mongoDBConnect from "../../../config/db";
import { stripeCheckoutSession } from "../../../controllers/paymentController";
import { isAuthenticatedUser } from "../../../middlewares/auth";

import onError from "../../../middlewares/onError";

mongoDBConnect();

const handler = nc({ onError });

handler.use(isAuthenticatedUser).get(stripeCheckoutSession);

export default handler;
