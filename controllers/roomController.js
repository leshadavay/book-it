import tryCatchAsyncErrors from "../middlewares/tryCatchAsyncErrors";
import Room from "../models/room";
import Booking from "../models/booking";
import cloudinary from "cloudinary";
import APIRequest from "../utils/APIRequest";
import ErrorHandler from "../utils/errorHandler";
import { checkObjectId, errorReport, successReport } from "../utils/common";

const allRooms = tryCatchAsyncErrors(async (req, res, next) => {
  const perPage = 4;
  const totalCount = await Room.countDocuments();

  const apiRequest = new APIRequest(Room.find(), req.query).search().filter();

  let rooms = await apiRequest.run;
  let totalCountFiltered = rooms.length;

  apiRequest.pagination(perPage);
  rooms = await apiRequest.run;

  successReport(res, {
    rooms,
    perPage,
    totalCount,
    totalCountFiltered,
  });
});

//create new room => /api/rooms

const newRoom = tryCatchAsyncErrors(async (req, res) => {
  const room = await Room.create(req.body);
  successReport(res, {
    room,
  });
});

//get room details => api/rooms/id

const getRoomDetails = tryCatchAsyncErrors(async (req, res, next) => {
  const { id } = req.query;

  const room = await Room.findById(id);
  if (!room) {
    return next(new ErrorHandler("Room not found with this _id", 404));
  }
  successReport(res, {
    room,
  });
});

//update room details => api/rooms/id

const updateRoomDetails = tryCatchAsyncErrors(async (req, res) => {
  const { id } = req.query;
  if (!checkObjectId(id)) {
    errorReport(res, {
      message: "Room not found with this _id",
    });
  }
  let room = await Room.findById(id);
  if (!room) {
    errorReport(res, {
      message: "Room not found with this _id",
    });
  }

  room = await Room.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  successReport(res, {
    room,
  });
});

//delete room details => api/rooms/id
const deleteRoomDetails = tryCatchAsyncErrors(async (req, res) => {
  const { id } = req.query;
  if (!checkObjectId(id)) {
    errorReport(res, {
      message: "Room not found with this _id",
    });
  }
  const room = await Room.findById(id);
  if (!room) {
    errorReport(res, {
      message: "Room not found with this _id",
    });
  }

  await room.remove();

  successReport(res, {
    message: "room has been successfully removed",
  });
});

//create a new review =>  /api/reviews
const createRoomReview = tryCatchAsyncErrors(async (req, res) => {
  const { rating, comment, roomId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const room = await Room.findById(roomId);
  const isReviewed = room.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  //update previous review if user has reviewed
  if (isReviewed) {
    room.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    room.reviews.push(review);
    room.numOfReviews = room.reviews.length;
  }

  room.rating =
    room.reviews.reduce((acc, item) => item.rating + acc, 0) /
    room.reviews.length;

  await room.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//Check if review availabilty   =>  /api/reviews/check
const checkReviewAvailability = tryCatchAsyncErrors(async (req, res) => {
  const { roomId } = req.query;

  const bookings = await Booking.find({ user: req.user._id, room: roomId });

  let reviewAvailable = false;

  if (bookings.length) {
    reviewAvailable = true;
  }

  res.status(200).json({
    reviewAvailable,
  });
});

/** admin  */

//get all rooms  =>  /api/admin/rooms
const getAllRoomsAdmin = tryCatchAsyncErrors(async (req, res) => {
  const rooms = await Room.find().sort({ createdAt: -1 });

  res.status(200).json({
    rooms,
  });
});

//create new room => /api/rooms

const createRoomAdmin = tryCatchAsyncErrors(async (req, res) => {
  const images = req.body.images;
  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const cloudinaryUpload = await cloudinary.v2.uploader.upload(images[i], {
      folder: "fakebook/rooms",
      width: "150",
      crop: "scale",
    });
    imagesLinks.push({
      public_id: cloudinaryUpload.public_id,
      url: cloudinaryUpload.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user._id;

  const room = await Room.create(req.body);
  successReport(res, {
    room,
  });
});

export {
  allRooms,
  newRoom,
  getRoomDetails,
  deleteRoomDetails,
  updateRoomDetails,
  createRoomReview,
  checkReviewAvailability,
  getAllRoomsAdmin,
  createRoomAdmin,
};
