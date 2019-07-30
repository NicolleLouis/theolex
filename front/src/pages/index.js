import React, { useState, useEffect } from "react";

import Sidebar from "../components/sidebar";
import Head from "../components/head";
import { Helmet } from "react-helmet-async";
import MainContent from "../components/main-content";
//import { createBrowserH/*istory } from 'history';

//const history = createBrowserHistory();

// Get the current location.
//const location = history.location;*/

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
      <Head />
      <Sidebar sidenavOpen={sidenavOpen} toggleSidenav={toggleSidenav} />
      <MainContent sidenavOpen={sidenavOpen} toggleSidenav={toggleSidenav} />
      {sidenavOpen ? (
        <div className="backdrop d-xl-none" onClick={toggleSidenav} />
      ) : null}
    </>
  );
};

export default Index;
