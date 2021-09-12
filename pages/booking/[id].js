import { getSession } from "next-auth/client";
import React from "react";
import BookingDetails from "../../components/Booking/BookingDetails";
import Layout from "../../components/Layout/Layout";
import { getBookingDetails } from "../../redux/actions/bookingActions";

import { wrapper } from "../../redux/store";

export default function Index() {
  return (
    <Layout title="My Bookings">
      <BookingDetails />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const session = await getSession({ req });

      if (!session) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }

      await store.dispatch(getBookingDetails(req, params.id));
    }
);
