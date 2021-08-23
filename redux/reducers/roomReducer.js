import {
  ALL_ROOMS_FAIL,
  ALL_ROOMS_SUCCESS,
  CLEAR_ERRORS,
  ROOM_DETAILS_FAIL,
  ROOM_DETAILS_SUCCESS,
} from "../constants/roomConstants";

const roomsInitialState = {
  rooms: [],
};

const roomInitialState = {
  room: {},
};

export const allRoomsReducer = (state = roomsInitialState, action) => {
  switch (action.type) {
    case ALL_ROOMS_SUCCESS:
      return {
        rooms: action.payload.rooms,
        perPage: action.payload.perPage,
        totalCount: action.payload.totalCount,
        totalCountFiltered: action.payload.totalCountFiltered,
      };
    case ALL_ROOMS_FAIL:
      return {
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        error: null,
      };
    default:
      return state;
  }
};

export const roomDetailsReducer = (state = roomInitialState, action) => {
  switch (action.type) {
    case ROOM_DETAILS_SUCCESS:
      return {
        room: action.payload,
      };
    case ROOM_DETAILS_FAIL:
      return {
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        error: null,
      };
    default:
      return state;
  }
};
