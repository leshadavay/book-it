import { getSession } from "next-auth/client";
import React from "react";
import Layout from "../../components/Layout/Layout";
import Profile from "../../components/User/Profile";

function MyProfile() {
  return (
    <Layout title="Update Profile">
      <Profile />
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
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

export default MyProfile;
