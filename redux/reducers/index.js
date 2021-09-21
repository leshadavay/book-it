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
  newRoomReducer,
  reviewReducer,
  roomDetailsReducer,
  roomReducer,
  roomReviewsReducer,
} from "./roomReducer";
import {
  allUserReducer,
  authReducer,
  forgotPasswordReducer,
  loadedUserReducer,
  userDetailsReducer,
  userReducer,
} from "./userReducer";

const rootReducer = combineReducers({
  allRooms: allRoomsReducer,
  allUsers: allUserReducer,
  newRoom: newRoomReducer,
  room: roomReducer,
  roomDetails: roomDetailsReducer,
  auth: authReducer,
  user: userReducer,
  userDetails: userDetailsReducer,
  loadedUser: loadedUserReducer,
  forgotPassword: forgotPasswordReducer,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  bookings: bookingListReducer,
  bookingDetails: bookingDetails,
  newReview: newReviewReducer,
  checkReview: checkReviewReducer,
  roomReviews: roomReviewsReducer,
  review: reviewReducer,
});

export default rootReducer;
