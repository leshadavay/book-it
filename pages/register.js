import { getSession } from "next-auth/client";
import Register from "../components/Auth/Register";
import Layout from "../components/Layout/Layout";

export default function Index() {
  return (
    <Layout title="Register">
      <Register />
    </Layout>
  );
}

//prevent to access login page in case if user has already logged in
export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
