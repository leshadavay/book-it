import Layout from "../components/Layout/Layout";
import Login from "../components/Auth/Login";
import { getSession } from "next-auth/client";

export default function Index() {
  return (
    <Layout title="Login">
      <Login />
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
