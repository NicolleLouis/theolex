import React, { useState } from "react";

import Sidebar from "../components/sidebar";
import Head from "../components/head";
import { Helmet } from "react-helmet-async";
import Search from "../components/search";

const Index = () => {
  const [isSidenavOpen, setIsSidenavOpen] = useState(true);

  const toggleSidenav = () => {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
    }
    setIsSidenavOpen(!isSidenavOpen);
  };

  const getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  };

  return (
    <>
      {isSidenavOpen && (
        <Helmet>
          <body className="g-sidenav-show g-sidenav-pinned" />
        </Helmet>
      )}
      <Head title="Home" />
      <Sidebar isSidenavOpen={isSidenavOpen} toggleSidenav={toggleSidenav} />
      <div className="main-content" id="panel">
        <Search isSidenavOpen={isSidenavOpen} />
      </div>
      {isSidenavOpen ? (
        <div className="backdrop d-xl-none" onClick={toggleSidenav} />
      ) : null}
    </>
  );
};

export default Index;
