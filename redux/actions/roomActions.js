import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
  ALL_ROOMS_SUCCESS,
  ALL_ROOMS_FAIL,
  ADMIN_ROOMS_REQUEST,
  ADMIN_ROOMS_SUCCESS,
  ADMIN_ROOMS_FAIL,
  CLEAR_ERRORS,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  REVIEW_AVAILABILITY_REQUEST,
  REVIEW_AVAILABILITY_SUCCESS,
  REVIEW_AVAILABILITY_FAIL,
  NEW_ROOM_REQUEST,
  NEW_ROOM_SUCCESS,
  NEW_ROOM_FAIL,
} from "../constants/roomConstants";

const config = {
  headers: {
    "Content-type": "application/json",
  },
};

export const getRooms = (req, query) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);
    const { page = 1, location = "", guests = "", category = "" } = query;
    let url = `${origin}/api/rooms?page=${page}&location=${location}`;

    if (guests) {
      url = url.concat(`&guestCapacity=${guests}`);
    }
    if (category) {
      url = url.concat(`&category=${category}`);
    }

    const { data } = await axios.get(url);
    dispatch({
      type: ALL_ROOMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ROOMS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getRoomDetails = (req, id) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);
    const { data } = await axios.get(`${origin}/api/rooms/${id}`);
    dispatch({
      type: ROOM_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ROOM_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//new review
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_REVIEW_REQUEST,
    });

    const { data } = await axios.put(`/api/reviews`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//check review availability
export const checkReviewAvailability = (roomId) => async (dispatch) => {
  try {
    dispatch({
      type: REVIEW_AVAILABILITY_REQUEST,
    });

    const { data } = await axios.get(`/api/reviews/check?roomId=${roomId}`);

    dispatch({
      type: REVIEW_AVAILABILITY_SUCCESS,
      payload: data.reviewAvailable,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_AVAILABILITY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

//*** admin routes */
//get all rooms for admin
export const getAdminRooms = () => async (dispatch) => {
  try {
    //use dispatch here since its not SSR
    dispatch({
      type: ADMIN_ROOMS_REQUEST,
    });

    const { data } = await axios.get(`/api/admin/rooms`);

    dispatch({
      type: ADMIN_ROOMS_SUCCESS,
      payload: data.rooms,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ROOMS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//create new room
export const createRoomAdmin = (roomData) => async (dispatch) => {
  try {
    //use dispatch here since its not SSR
    dispatch({
      type: NEW_ROOM_REQUEST,
    });

    const { data } = await axios.post(`/api/admin/rooms`, roomData, config);

    dispatch({
      type: NEW_ROOM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_ROOM_FAIL,
      payload: error.response.data.message,
    });
  }
};
