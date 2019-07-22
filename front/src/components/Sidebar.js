import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";
import logo from "../assets/img/brand/theolex-logo.png";

const logoStyle = {
  height: "inherit",
  maxWidth: "100%",
  position: "relative",
  top: "-23px"
};
// className="sidebar-brand d-flex align-items-center justify-content-center"
const Sidebar = () => {
  return (
    <>
      <Nav
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <NavItem>
          <NavLink
            href="index.html"
          >
            <div className="sidebar-brand align-items-center justify-content-center">
              <img src={logo} style={logoStyle}/>
            </div>
          </NavLink>
        </NavItem>
        <hr className="sidebar-divider my-0" />
        <NavItem>
          <NavLink className="nav-item active" href="index.html">
            <FontAwesomeIcon icon="table" className="fas fa-fw" />
            <span>DPA</span>
          </NavLink>
        </NavItem>
        <hr className="sidebar-divider my-0" />
        <NavItem>
          <NavLink className="nav-item active" href="index.html">
            <FontAwesomeIcon icon="table" className="fas fa-fw" />
            <span>Jurisprudence</span>
          </NavLink>
        </NavItem>
      </Nav>
    </>
  );
};

export default Sidebar;
