import React, { useState, useEffect } from "react";

import Sidebar from "../components/sidebar";
import Head from "../components/head";
import { Helmet } from "react-helmet-async";
import Main from "../components/main";

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

  return (
    <>
      {isSidenavOpen && (
        <Helmet>
          <body className="g-sidenav-show g-sidenav-pinned" />
        </Helmet>
      )}
      <Head title="Home" />
      <Sidebar isSidenavOpen={isSidenavOpen} toggleSidenav={toggleSidenav} />
      <Main isSidenavOpen={isSidenavOpen} toggleSidenav={toggleSidenav} />
      {isSidenavOpen ? (
        <div className="backdrop d-xl-none" onClick={toggleSidenav} />
      ) : null}
    </>
  );
};

export default Index;
