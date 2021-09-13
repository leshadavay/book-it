import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, newReview } from "../../redux/actions/roomActions";

import RoomFeatures from "./RoomFeatures";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {
  checkBooking,
  createBooking,
  makeBookingPayment,
  getBookedDates,
} from "../../redux/actions/bookingActions";
import ButtonLoader from "../Common/ButtonLoader";
import { toast } from "react-toastify";
import {
  CHECK_BOOKING_RESET,
  CREATE_BOOKING_RESET,
} from "../../redux/constants/bookingConstants";
import axios from "axios";
import getStripe from "../../utils/getStripe";
import NewReview from "../Review/NewReview";
import ReviewsList from "../Review/ReviewsList";

function RoomDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    room: { room },
    error,
  } = useSelector((state) => state.roomDetails);
  const {
    available,
    loading: createLoading,
    isCreated,
    sessionId,
  } = useSelector((state) => state.checkBooking);
  const { user } = useSelector((state) => state.loadedUser);
  const { dates } = useSelector((state) => state.bookedDates);

  const excludedDates = [];
  dates.forEach((date) => {
    excludedDates.push(new Date(date));
  });

  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [daysOfStay, setDaysOfStay] = useState();

  const { id: roomId } = router.query;

  const onChangeDatePicker = (dates) => {
    const [checkInDate, checkOutDate] = dates;
    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);

    if (checkInDate && checkOutDate) {
      //calculate days of stay (total day - 1)
      const days = Math.floor(
        (new Date(checkOutDate) - new Date(checkInDate)) / 86400000 + 1
      );
      setDaysOfStay(days);

      dispatch(
        checkBooking(
          roomId,
          checkInDate.toISOString(),
          checkOutDate.toISOString()
        )
      );
    }
  };

  const onClickPay = async () => {
    dispatch(
      makeBookingPayment({
        room,
        checkInDate,
        checkOutDate,
        daysOfStay,
      })
    );

    /* createBooking({
        room: router.query.id,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid: 90,
        paymentInfo: {
          id: "STRIPE_PAYMENT_ID",
          status: "STRIPE_PAYMENT_STATUS",
        },
      }) */
  };

  //make payment and create new booking
  const bookRoom = async (e) => {
    const { pricePerNight, daysOfStay, _id } = room;

    const amount = pricePerNight * daysOfStay;

    try {
      const link = `/api/checkout/${_id}?checkInDate=${checkInDate.toISOString()}&checkOutDate=${checkOutDate.toISOString()}&daysOfStay=${daysOfStay}`;

      const { data } = await axios.get(link, { params: { amount } });

      const stripe = await getStripe();

      //redirect to checkout
      stripe.redirectToCheckout({
        sessionId: data.id,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const connectStripe = async () => {
    if (isCreated && sessionId) {
      //toast.success("Your booking has been created successfully");
      const stripe = await getStripe();

      stripe.redirectToCheckout({
        sessionId,
      });

      dispatch({
        type: CREATE_BOOKING_RESET,
      });
      setCheckInDate();
      setCheckOutDate();
    }
  };

  const submitReviewHandler = async (reviewData) => {
    const { rating, comment } = reviewData;

    dispatch(newReview({ rating, comment, roomId }));
  };

  useEffect(() => {
    dispatch(getBookedDates(roomId));

    connectStripe();

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    return () => {
      dispatch({
        type: CHECK_BOOKING_RESET,
      });
    };
  }, [dispatch, roomId, isCreated]);
  return (
    <>
      <Head>
        <title>{room.name} - BookIt</title>
      </Head>
      <div className="container container-fluid">
        <h2 className="mt-5">{room.name}</h2>
        <p>{room.address}</p>

        <div className="ratings mt-auto mb-3">
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(room.rating / 5) * 100}%` }}
            ></div>
          </div>
          <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
        </div>

        <Carousel hover="pause">
          {room.images &&
            room.images.map((image) => (
              <Carousel.Item key={image.public_id}>
                <div style={{ width: "100%", height: "440px" }}>
                  <Image
                    className="d-block m-auto"
                    src={image.url}
                    alt={room.name}
                    layout="fill"
                  />
                </div>
              </Carousel.Item>
            ))}
        </Carousel>

        <div className="row my-5">
          <div className="col-12 col-md-6 col-lg-8">
            <h3>Description</h3>
            <p>{room.description}</p>

            <RoomFeatures room={room} />
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="booking-card shadow-lg p-4">
              <p className="price-per-night">
                <b>${room.pricePerNight}</b> / night
              </p>

              <hr />
              <p className="mt-5 mb-3">Pick Check In & Check Out Date</p>
              <DatePicker
                className="w-100"
                selected={checkInDate}
                onChange={onChangeDatePicker}
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={new Date()}
                excludeDates={excludedDates}
                selectsRange
                inline
              />

              {available === true && (
                <div className="alert alert-success my-3 font-weight-bold">
                  Room is available, Book now!
                </div>
              )}

              {available === false && (
                <div className="alert alert-danger my-3 font-weight-bold">
                  Room is not available, Try with different dates!
                </div>
              )}

              {available && user && (
                <button
                  className="btn btn-block py-3 booking-btn"
                  onClick={onClickPay}
                  disabled={createLoading ? true : false}
                >
                  {createLoading ? (
                    <ButtonLoader />
                  ) : (
                    `Pay - $${daysOfStay * room.pricePerNight}`
                  )}
                </button>
              )}
              {available && !user && (
                <div className="alert alert-danger my-3 font-weight-bold">
                  Login to book room!
                </div>
              )}
            </div>
          </div>
        </div>
        <NewReview submitReviewHandler={submitReviewHandler} />
        {room.reviews && room.reviews.length ? (
          <ReviewsList reviews={room.reviews} />
        ) : (
          <p>
            <b>No Reviews</b>
          </p>
        )}
      </div>
    </>
  );
}

export default RoomDetails;
