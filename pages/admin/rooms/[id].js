import { getSession } from "next-auth/client";
import React from "react";
import UpdateRoom from "../../../components/Admin/UpdateRoom";
import Layout from "../../../components/Layout/Layout";
import { getRoomDetails } from "../../../redux/actions/roomActions";
import { wrapper } from "../../../redux/store";

export default function Index() {
  return (
    <Layout title="Update Room">
      <UpdateRoom />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const session = await getSession({ req });

      if (!session || session.user.role !== "admin") {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
      await store.dispatch(getRoomDetails(req, params.id));
    }
);
