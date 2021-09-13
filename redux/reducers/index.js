import { combineReducers } from "redux";
import {
  checkBookingReducer,
  bookedDatesReducer,
  bookingListReducer,
  bookingDetails,
} from "./bookingReducer";
import {
  allRoomsReducer,
  checkReviewReducer,
  newReviewReducer,
  roomDetailsReducer,
} from "./roomReducer";
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
  bookingDetails: bookingDetails,
  newReview: newReviewReducer,
  checkReview: checkReviewReducer,
});

export default rootReducer;
