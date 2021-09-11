import { combineReducers } from "redux";
import {
  checkBookingReducer,
  bookedDatesReducer,
  bookingListReducer,
} from "./bookingReducer";
import { allRoomsReducer, roomDetailsReducer } from "./roomReducer";
import {
  authReducer,
  forgotPasswordReducer,
  loadedUserReducer,
  userReducer,
} from "./userReducer";

const rootReducer = combineReducers({
  allRooms: allRoomsReducer,
  roomDetails: roomDetailsReducer,
  auth: authReducer,
  user: userReducer,
  loadedUser: loadedUserReducer,
  forgotPassword: forgotPasswordReducer,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  bookings: bookingListReducer,
});

export default rootReducer;
