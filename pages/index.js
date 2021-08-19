import Head from "next/head";
import Image from "next/image";

import Home from "./components/Home";
import Layout from "./components/Layout/Layout";

export default function Index() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}
