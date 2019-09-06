import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Head from "./head";
import Sidebar from "../organisms/sidebar";
import SearchPage from "./search-page";

const sidebarContext = [
  { index: 1, label: "DPA", color: "text-pink" },
  { index: 2, label: "Jurisprudence", color: "text-blue" }
];

const PageWrapper = ({ title }) => {
  /* Sidebar Management */
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

  /* Required to force server rendering */
  const getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  };

  /* Manage page rendering */
  const [sidenavTab, setSidenavTab] = useState(1);
  const renderPage = () => {
    switch (sidenavTab) {
      case 1:
        return <SearchPage />;
      case 2:
        return <>Autre page</>;
      default:
        return <></>;
    }
  };

  useEffect(() => {
    console.log("Sidenavtab", sidenavTab);
  }, [sidenavTab]);

  return (
    <>
      {isSidenavOpen && (
        <Helmet>
          <body className="g-sidenav-show g-sidenav-pinned" />
        </Helmet>
      )}
      <Head title={title} />

      <Sidebar
        sidebarContext={sidebarContext}
        sidenavTab={sidenavTab}
        setSidenavTab={setSidenavTab}
        isSidenavOpen={isSidenavOpen}
        toggleSidenav={toggleSidenav}
      />
      <div className="main-content" id="panel">
        {renderPage()}
      </div>
    </>
  );
};

export default PageWrapper;