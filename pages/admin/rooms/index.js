import { getSession } from "next-auth/client";
import React from "react";
import AllRooms from "../../../components/Admin/AllRooms";
import Layout from "../../../components/Layout/Layout";

export default function Index() {
  return (
    <Layout title="All Rooms">
      <AllRooms />
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session || session.user.role !== "admin") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};
