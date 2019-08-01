import React, { useState, useEffect } from "react";

import Sidebar from "../components/sidebar";
import Head from "../components/head";
import { Helmet } from "react-helmet-async";
import Main from "../components/main";
import Search from "../components/search/search";

const Index = () => {
  const [sidenavOpen, setSidenavOpen] = useState(true);

  const toggleSidenav = () => {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
    }
    setSidenavOpen(!sidenavOpen);
  };

  return (
    <>
      {sidenavOpen && (
        <Helmet>
          <body className="g-sidenav-show g-sidenav-pinned" />
        </Helmet>
      )}
      <Head title="Home" />
      <Sidebar sidenavOpen={sidenavOpen} toggleSidenav={toggleSidenav} />
      <Main sidenavOpen={sidenavOpen} toggleSidenav={toggleSidenav} />
      {sidenavOpen ? (
        <div className="backdrop d-xl-none" onClick={toggleSidenav} />
      ) : null}
    </>
  );
};

export default Index;
