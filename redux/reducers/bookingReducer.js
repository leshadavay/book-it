import {
  BOOKED_DATES_FAIL,
  BOOKED_DATES_SUCCESS,
  CHECK_BOOKING_FAIL,
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_RESET,
  CHECK_BOOKING_SUCCESS,
  CREATE_BOOKING_REQUEST,
  CREATE_BOOKING_SUCCESS,
  CREATE_BOOKING_FAIL,
  CLEAR_ERRORS,
  CREATE_BOOKING_RESET,
  MY_BOOKINGS_SUCCESS,
  MY_BOOKINGS_FAIL,
} from "../constants/bookingConstants";

const authInitialState = {
  available: null,
  isCreated: false,
  sessionId: null,
  loading: false,
};

//check booking reducer
export const checkBookingReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case CREATE_BOOKING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHECK_BOOKING_REQUEST:
      return {
        loading: true,
      };

    case CREATE_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    case CHECK_BOOKING_SUCCESS:
      return {
        loading: false,
        available: action.payload,
      };
    case CREATE_BOOKING_FAIL:
      return {
        ...state,
        loading: false,
        isCreated: false,
        sessionId: null,
        error: action.payload,
      };
    case CHECK_BOOKING_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_BOOKING_RESET:
      return {
        ...state,
        loading: false,
        available: null,
        sessionId: null,
        isCreated: false,
      };
    case CHECK_BOOKING_RESET:
      return {
        loading: false,
        available: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//get all booked dates
export const bookedDatesReducer = (state = { dates: [] }, action) => {
  switch (action.type) {
    case BOOKED_DATES_SUCCESS:
      return {
        loading: false,
        dates: action.payload,
      };

    case BOOKED_DATES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//get all my bookings
export const bookingListReducer = (state = { bookings: [] }, action) => {
  switch (action.type) {
    case MY_BOOKINGS_SUCCESS:
      return {
        loading: false,
        bookings: action.payload,
      };

    case MY_BOOKINGS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//load user reducer
export const loadedUserReducer = (
  state = { loading: true, user: null },
  action
) => {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOAD_USER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//user auth reducer
export const userReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };
    case UPDATE_PROFILE_RESET:
      return {
        loading: false,
        isUpdated: false,
      };
    case UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//user auth reducer
export const forgotPasswordReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        loading: true,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
