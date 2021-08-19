import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children, title = "Book Best Hotels" }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
