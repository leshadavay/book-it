import { getSession } from "next-auth/client";
import React from "react";
import UpdateUser from "../../../components/Admin/UpdateUser";
import Layout from "../../../components/Layout/Layout";
import { getUserDetailsAdmin } from "../../../redux/actions/userActions";
import { wrapper } from "../../../redux/store";

export default function Index() {
  return (
    <Layout title="Update User">
      <UpdateUser />
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
      console.log("params: ", params);
      await store.dispatch(getUserDetailsAdmin(req, params.id));
    }
);
