import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors } from "../../redux/actions/bookingActions";
import { MDBDataTable } from "mdbreact";
import easyinvoice from "easyinvoice";
import ButtonLoader from "../Common/ButtonLoader";
import Link from "next/link";

function MyBookings() {
  const dispatch = useDispatch();

  const { bookings, error } = useSelector((state) => state.bookings);
  const [loading, setLoading] = useState({});

  useEffect(() => {
    if (error) {
      console.log("error: ", error);
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch]);

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
          label: "Amount paid",
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
        data.rows.push({
          no: index + 1,
          id: booking._id,
          checkIn: new Date(booking.checkInDate).toLocaleString("en-US"),
          checkOut: new Date(booking.checkOutDate).toLocaleString("en-US"),
          amount: `$${booking.amountPaid}`,
          actions: (
            <>
              <Link href={`/booking/${booking._id}`}>
                <a className="btn btn-primary">
                  <i className="fa fa-eye" />
                </a>
              </Link>
              <button
                className="btn btn-success mx-2"
                onClick={() => downloadInvoice(booking)}
                disabled={loading[booking._id] ? true : false}
              >
                {loading[booking._id] ? (
                  <ButtonLoader />
                ) : (
                  <i className="fa fa-download" />
                )}
              </button>
            </>
          ),
        });
      });

    return data;
  };

  const downloadInvoice = async (booking) => {
    setLoading({ [booking._id]: true });
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
        company: `${booking.user.name}`,
        address: `${booking.user.email}`,
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

  return (
    <div className="container container-fluid">
      <h1 className="my-5">My Bookings</h1>
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

export default MyBookings;
