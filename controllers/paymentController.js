import absoluteUrl from "next-absolute-url";
import tryCatchAsyncErrors from "../middlewares/tryCatchAsyncErrors";
import Room from "../models/room";
import User from "../models/user";
import APIRequest from "../utils/APIRequest";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//generate stripe checkout session  =>  api/checkout/:roomId
const stripeCheckoutSession = tryCatchAsyncErrors(async (req, res, next) => {
  //get room details

  const { checkInDate, checkOutDate, daysOfStay, roomId } = req.query;

  const room = await Room.findById(roomId);

  //get origin
  const { origin } = absoluteUrl(req);

  //create stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${origin}/booking/me`,
    cancel_url: `${origin}/room/${room._id}`,
    customer_email: req.user.email,
    client_reference_id: req.query.roomId,
    metadata: {
      checkInDate,
      checkOutDate,
      daysOfStay,
    },
    line_items: [
      {
        name: room.name,
        images: [`${room.images[0].url}`],
        amount: req.query.amount * 100,
        currency: "usd",
        quantity: 1,
      },
    ],
  });

  res.status(200).json(session);
});

export { stripeCheckoutSession };
