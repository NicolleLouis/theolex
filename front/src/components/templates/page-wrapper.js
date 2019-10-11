import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Head from "./head";
import Sidebar from "../organisms/sidebar";
import SearchPage from "./search-page";
import { sidebarConfig } from "../../config";
import AnalyticsPage from "./analytics-page";
import BenchmarkPage from "./benchmark-page";
import ApplicationContext from "../../config/application-context";
import cookie from "js-cookie";

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
        return <AnalyticsPage />;
      case 3:
        return <BenchmarkPage />;
      default:
        return <></>;
    }
  };

  /* Basket state management */
  const [basket, setBasket] = useState({ decisions: [] });
  /* Basket init */
  useEffect(() => {
    const cookieBasket = cookie.get("basket");
    setBasket(
      cookie.get("basket") !== undefined
        ? JSON.parse(cookie.get("basket"))
        : { decisions: [] }
    );
  }, []);

  /* Basket cookie update */
  useEffect(() => {
    cookie.remove("basket");
    cookie.set("basket", basket, { expires: 1000 });
  }, [basket]);

  /* Reset basket */
  const resetBasket = () => setBasket({ decisions: [] });

  /* Manage Modal */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [contentId, setContentId] = useState("");

  const onClose = () => setIsModalOpen(false);

  const contextValue = {
    modalCxt: {
      isModalOpen,
      setIsModalOpen,
      modalTitle,
      setModalTitle,
      contentId,
      setContentId,
      onClose
    },
    basketCxt: { basket, setBasket, resetBasket }
  };

  return (
    <>
      {isSidenavOpen && (
        <Helmet>
          <body className="g-sidenav-show g-sidenav-pinned" />
        </Helmet>
      )}
      <Head title={title} />

      <Sidebar
        sidebarContext={sidebarConfig}
        sidenavTab={sidenavTab}
        setSidenavTab={setSidenavTab}
        isSidenavOpen={isSidenavOpen}
        toggleSidenav={toggleSidenav}
      />
      <ApplicationContext.Provider value={contextValue}>
        <div className="main-content" id="panel">
          {renderPage()}
        </div>
      </ApplicationContext.Provider>
    </>
  );
};

export default PageWrapper;
