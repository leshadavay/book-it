import { combineReducers } from "redux";
import { allRoomsReducer, roomDetailsReducer } from "./roomReducer";
import { authReducer, forgotPasswordReducer, userReducer } from "./userReducer";

const rootReducer = combineReducers({
  allRooms: allRoomsReducer,
  roomDetails: roomDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
});

export default rootReducer;
