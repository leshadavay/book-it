import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
  ALL_ROOMS_SUCCESS,
  ALL_ROOMS_FAIL,
  CLEAR_ERRORS,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
} from "../constants/roomConstants";

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

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
