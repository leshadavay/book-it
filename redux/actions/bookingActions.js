import axios from "axios";
import {
  ADMIN_BOOKINGS_FAIL,
  ADMIN_BOOKINGS_REQUEST,
  ADMIN_BOOKINGS_SUCCESS,
  BOOKED_DATES_FAIL,
  BOOKED_DATES_SUCCESS,
  BOOKING_DETAILS_FAIL,
  BOOKING_DETAILS_SUCCESS,
  CHECK_BOOKING_FAIL,
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_SUCCESS,
  CLEAR_ERRORS,
  CREATE_BOOKING_FAIL,
  CREATE_BOOKING_REQUEST,
  CREATE_BOOKING_SUCCESS,
  MY_BOOKINGS_FAIL,
  MY_BOOKINGS_SUCCESS,
  DELETE_BOOKING_REQUEST,
  DELETE_BOOKING_SUCCESS,
  DELETE_BOOKING_FAIL,
} from "../constants/bookingConstants";
import absoluteUrl from "next-absolute-url";

//check booking
export const checkBooking =
  (roomId, checkInDate, checkOutDate) => async (dispatch) => {
    try {
      dispatch({
        type: CHECK_BOOKING_REQUEST,
      });

      let link = `/api/booking/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;

      const { data } = await axios.get(link);

      dispatch({
        type: CHECK_BOOKING_SUCCESS,
        payload: data.isAvailable,
      });
    } catch (error) {
      dispatch({
        type: CHECK_BOOKING_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//on click pay button
export const makeBookingPayment = (bookingData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_BOOKING_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {
      room: { pricePerNight, _id },
      checkInDate,
      checkOutDate,
      daysOfStay,
    } = bookingData;
    const amount = pricePerNight * daysOfStay;

    const link = `/api/checkout/${_id}?checkInDate=${checkInDate.toISOString()}&checkOutDate=${checkOutDate.toISOString()}&daysOfStay=${daysOfStay}`;

    const { data } = await axios.get(link, { params: { amount } });

    dispatch({
      type: CREATE_BOOKING_SUCCESS,
      payload: { sessionId: data.id, isCreated: true },
    });
  } catch (error) {
    dispatch({
      type: CREATE_BOOKING_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const createBooking = (bookingData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_BOOKING_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/booking", bookingData, config);

    dispatch({
      type: CREATE_BOOKING_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: CREATE_BOOKING_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get my bookings list
export const getMyBookings = (req) => async (dispatch) => {
  try {
    //appending cookie is essential when getServerProps is being used
    const { cookie } = req.headers;
    const { origin } = absoluteUrl(req);
    const config = {
      headers: {
        cookie,
      },
    };

    const { data } = await axios.get(`${origin}/api/booking/list`, config);

    dispatch({
      type: MY_BOOKINGS_SUCCESS,
      payload: data.bookings,
    });
  } catch (error) {
    dispatch({
      type: MY_BOOKINGS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get single booking details
export const getBookingDetails = (req, id) => async (dispatch) => {
  try {
    //appending cookie is essential when getServerProps is being used
    const { cookie } = req.headers;
    const { origin } = absoluteUrl(req);
    const config = {
      headers: {
        cookie,
      },
    };

    const { data } = await axios.get(`${origin}/api/booking/${id}`, config);

    dispatch({
      type: BOOKING_DETAILS_SUCCESS,
      payload: data.booking,
    });
  } catch (error) {
    dispatch({
      type: BOOKING_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
//register user
export const getBookedDates = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/booking/dates?roomId=${id}`);

    dispatch({
      type: BOOKED_DATES_SUCCESS,
      payload: data.bookedDates,
    });
  } catch (error) {
    dispatch({
      type: BOOKED_DATES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

/** admin routes */

//get all bookings for admin page
export const getAllBookingsAdmin = (req) => async (dispatch) => {
  try {
    //appending cookie is essential when getServerProps is being used
    dispatch({ type: ADMIN_BOOKINGS_REQUEST });

    const { data } = await axios.get(`/api/admin/bookings`);

    dispatch({
      type: ADMIN_BOOKINGS_SUCCESS,
      payload: data.bookings,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_BOOKINGS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//delete singe booking from table list
export const deleteBookingAdmin = (bookingId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BOOKING_REQUEST });

    const { data } = await axios.delete(`/api/admin/bookings/${bookingId}`);

    dispatch({
      type: DELETE_BOOKING_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BOOKING_FAIL,
      payload: error.response.data.message,
    });
  }
};
