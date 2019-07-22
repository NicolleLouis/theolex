import React from "react";
import { Helmet } from "react-helmet-async";
import Sidebar from "../components/Sidebar";
import MainContent from '../components/MainContent';

const Index = () => {
  return (
    <>
      <Helmet>
        <body id="page-top" />
      </Helmet>
      <div id="wrapper">
        <Sidebar/>
        <div id="content-wrapper" className="d-flex flex-column">
          <MainContent/>
        </div>
      </div>
    </>
  );
};

export default Index;
