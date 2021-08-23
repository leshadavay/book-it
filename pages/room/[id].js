import { getRoomDetails } from "../../redux/actions/roomActions";
import { wrapper } from "../../redux/store";
import RoomDetails from "../components/Room/RoomDetails";

import Layout from "../components/Layout/Layout";

export default function Index() {
  return (
    <Layout>
      <RoomDetails title={"Room Details"} />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      await store.dispatch(getRoomDetails(req, params.id));
    }
);
