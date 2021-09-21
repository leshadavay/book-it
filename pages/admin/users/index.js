import { getSession } from "next-auth/client";
import React from "react";
import AllUsers from "../../../components/Admin/AllUsers";
import Layout from "../../../components/Layout/Layout";

export default function Index() {
  return (
    <Layout title="All Rooms">
      <AllUsers />
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session || session.user.role !== "admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};
