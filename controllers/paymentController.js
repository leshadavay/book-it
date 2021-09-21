import absoluteUrl from "next-absolute-url";
import getRawBody from "raw-body";
import tryCatchAsyncErrors from "../middlewares/tryCatchAsyncErrors";
import Room from "../models/room";
import User from "../models/user";
import Booking from "../models/booking";

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
    success_url: `${origin}/booking/list`,
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

//create new booking after payment  =>  /api/booking
const webhookCheckout = tryCatchAsyncErrors(async (req, res) => {
  //first check if payment is successfully done

  const rawBody = await getRawBody(req);

  try {
    const signature = req.headers["stripe-signature"];

    //pas raw req body (not supported in next js )
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log("stripe event emitted: ", event);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const room = session.client_reference_id;
      const user = await User.findOne({ email: session.customer_email });

      const amountPaid = session.amount_total / 100;
      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };

      const { checkInDate, checkOutDate, daysOfStay } = session.metadata;

      await Booking.create({
        room,
        user,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now(),
      });

      res.status(200).json({
        success: true,
      });
    }
  } catch (error) {
    console.log("error in stripe checkout payment: ", error);
  }

  res.status(200).json(session);
});

export { stripeCheckoutSession, webhookCheckout };
