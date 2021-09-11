import nc from "next-connect";
import mongoDBConnect from "../../../config/db";

import { webhookCheckout } from "../../../controllers/paymentController";

import onError from "../../../middlewares/onError";

const handler = nc({ onError });

mongoDBConnect();

//let default bodyparser to not working because of "raw-body"
export const config = {
  api: {
    bodyParser: false,
  },
};

console.log("api enter");

handler.post(webhookCheckout);

export default handler;
