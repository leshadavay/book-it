import tryCatchAsyncErrors from "../middlewares/tryCatchAsyncErrors";
import Room from "../models/room";
import APIRequest from "../utils/APIRequest";
import { checkObjectId, errorReport, successReport } from "../utils/common";
import ErrorHandler from "../utils/errorHandler";

const allRooms = tryCatchAsyncErrors(async (req, res) => {
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
export {
  allRooms,
  newRoom,
  getRoomDetails,
  deleteRoomDetails,
  updateRoomDetails,
};
