import React from "react";
import TopbarSearch from "./TopbarSearch";
import { Navbar, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Topbar = () => {
  return (
    <Navbar color="light" light expand="md" className="topbar mb-4 static-top shadow">
      <Button id="sidebarToggleTop" className="d-md-none rounded-circle mr-3" active>
        <FontAwesomeIcon icon="bars" />
      </Button>
      <TopbarSearch>Search</TopbarSearch>
    </Navbar>
  );
};

export default Topbar;
