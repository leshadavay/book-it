import tryCatchAsyncErrors from "../middlewares/tryCatchAsyncErrors";
import Booking from "../models/booking";

import ErrorHandler from "../utils/errorHandler";

//create new booking  =>  /api/auth/register
const newBooking = tryCatchAsyncErrors(async (req, res) => {
  const {
    room,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  } = req.body;

  const booking = await Booking.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  });

  console.log("req booking: ", booking);

  res.status(200).json({
    success: true,
    booking,
  });
});

//check room booking availability => api/booking/check
const checkBookingAvailability = tryCatchAsyncErrors(async (req, res) => {
  let { roomId, checkInDate, checkOutDate } = req.query;

  checkInDate = new Date(checkInDate);
  checkOutDate = new Date(checkOutDate);

  const bookings = await Booking.find({
    room: roomId,
    $and: [
      {
        checkInDate: {
          $lte: checkOutDate,
        },
      },
      {
        checkOutDate: {
          $gte: checkInDate,
        },
      },
    ],
  });

  //check if there is any booking available
  let isAvailable = false;

  if (bookings && bookings.length === 0) {
    isAvailable = true;
  }

  res.status(200).json({
    success: true,
    isAvailable,
  });
});

export { newBooking, checkBookingAvailability };
