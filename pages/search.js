import { getRooms } from "../redux/actions/roomActions";
import { wrapper } from "../redux/store";

import Layout from "../components/Layout/Layout";
import Search from "../components/Search";

export default function Index() {
  return (
    <Layout title="Search Rooms">
      <Search />
    </Layout>
  );
}
