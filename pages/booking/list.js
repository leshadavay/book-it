import { getSession } from "next-auth/client";
import React from "react";
import MyBookings from "../../components/Booking/MyBookings";
import Layout from "../../components/Layout/Layout";
import { getMyBookings } from "../../redux/actions/bookingActions";

import { wrapper } from "../../redux/store";

export default function Index() {
  return (
    <Layout title="My Bookings">
      <MyBookings />
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

      await store.dispatch(getMyBookings(req));
    }
);
