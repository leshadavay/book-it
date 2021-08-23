import { getRooms } from "../redux/actions/roomActions";
import { wrapper } from "../redux/store";

import Home from "./components/Home";
import Layout from "./components/Layout/Layout";

export default function Index() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ preview, query, req }) => {
      await store.dispatch(getRooms(req, query));
    }
);
