import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import {
  clearErrors,
  deleteBookingAdmin,
  getAllBookingsAdmin,
} from "../../redux/actions/bookingActions";
import { MDBDataTable } from "mdbreact";
import easyinvoice from "easyinvoice";
import Loader from "../Common/Loader";
import Link from "next/link";
import ButtonLoader from "../Common/ButtonLoader";
import { DELETE_BOOKING_RESET } from "../../redux/constants/bookingConstants";
function AllBookingsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState({});
  const {
    loading: bookingLoading,
    bookings,
    success,
    error,
  } = useSelector((state) => state.bookings);

  const setBookings = () => {
    const data = {
      columns: [
        {
          label: "#",
          field: "no",
          sort: "desc",
        },
        {
          label: "Booking Id",
          field: "id",
          sort: "desc",
        },
        {
          label: "User Name",
          field: "username",
          sort: "desc",
        },
        {
          label: "User email",
          field: "useremail",
          sort: "desc",
        },
        {
          label: "Days Of Stay",
          field: "days",
          sort: "desc",
        },
        {
          label: "Check In",
          field: "checkIn",
          sort: "desc",
        },
        {
          label: "Check Out",
          field: "checkOut",
          sort: "desc",
        },
        {
          label: "Paid",
          field: "amount",
          sort: "desc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "desc",
        },
      ],
      rows: [],
    };

    //set data
    bookings &&
      bookings.forEach((booking, index) => {
        const { user } = booking;
        data.rows.push({
          no: index + 1,
          id: booking._id,
          username: user ? user.name : "",
          useremail: user ? user.email : "",
          days: booking.daysOfStay,
          checkIn: new Date(booking.checkInDate).toLocaleString("en-US"),
          checkOut: new Date(booking.checkOutDate).toLocaleString("en-US"),
          amount: `$${booking.amountPaid}`,
          actions: (
            <div className="d-flex">
              <Link href={`/booking/${booking._id}`}>
                <a className="btn btn-sm btn-primary">
                  <i className="fa fa-eye" />
                </a>
              </Link>
              <button
                className="btn btn-sm btn-success mx-2"
                onClick={() => downloadInvoice(booking)}
              >
                <i className="fa fa-download" />
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteBooking(booking)}
                disabled={loading[booking._id] ? true : false}
              >
                {loading[booking._id] ? (
                  <ButtonLoader />
                ) : (
                  <i className="fa fa-trash" />
                )}
              </button>
            </div>
          ),
        });
      });

    return data;
  };

  const downloadInvoice = async (booking) => {
    setLoading({ [booking._id]: true });
    const { user } = booking;
    const data = {
      documentTitle: "Booking INVOICE",
      currency: "USD", //See documentation 'Locales and Currency' for more info
      taxNotation: "vat", //or gst
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      logo: "https://public.easyinvoice.cloud/img/logo_en_original.png", //or base64
      /* background: "https://public.easyinvoice.cloud/img/watermark-draft.jpg", //or base64 //img or pdf */
      sender: {
        company: "FakeBook",
        address: "Fake Street 123",
        zip: "10001",
        city: "Fergana",
        country: "Uzbekistan",
      },
      client: {
        company: `${user.name}`,
        address: `${user.email}`,
        zip: "",
        city: `Check In: ${new Date(booking.checkInDate).toLocaleString(
          "en-US"
        )}`,
        country: `Check Out: ${new Date(booking.checkOutDate).toLocaleString(
          "en-US"
        )}`,
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
      },
      invoiceNumber: `${booking._id}`,
      invoiceDate: `${new Date(Date.now()).toLocaleString("en-US")}`,
      products: [
        {
          quantity: `${booking.daysOfStay}`,
          description: `${booking.room.name}`,
          tax: 0,
          price: `${booking.room.pricePerNight}`,
        },
      ],
      bottomNotice:
        "This is auto generated Invoice of your booking on FakeBook.",
    };

    const result = await easyinvoice.createInvoice(data);
    easyinvoice.download(`Invoice_${booking._id}.pdf`, result.pdf);
    setLoading({ [booking._id]: false });
  };

  const deleteBooking = (booking) => {
    if (confirm("Are you sure")) {
      dispatch(deleteBookingAdmin(booking._id));
    }
  };

  useEffect(() => {
    dispatch(getAllBookingsAdmin());
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Booking has been removed");
      dispatch({ type: DELETE_BOOKING_RESET });
    }
  }, [dispatch, success]);
  return bookingLoading ? (
    <Loader />
  ) : (
    <div className="container-lg container-fluid">
      <h1 className="my-5 text-center">{`${
        bookings && bookings.length
      } Bookings`}</h1>
      <MDBDataTable
        data={setBookings()}
        className="px-3"
        bordered
        striped
        hover
      />
    </div>
  );
}

export default AllBookingsPage;
