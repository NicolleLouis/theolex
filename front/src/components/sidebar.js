import React, { useState } from "react";
import styles from "styled-components";
import classnames from "classnames";

const Logo = styles.img`
  max-height: 5rem !important;
`;

const Sidebar = props => {
  console.log("SidebarLayout Props", props);

  // makes the sidenav normal on hover (actually when mouse enters on it)
  const onMouseEnterSidenav = () => {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.add("g-sidenav-show");
    }
  };
  // makes the sidenav mini on hover (actually when mouse leaves from it)
  const onMouseLeaveSidenav = () => {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-show");
    }
  };
  return (
    <>
      <nav
        className="sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-light"
        id="sidenav-main"
        onMouseEnter={onMouseEnterSidenav}
        onMouseLeave={onMouseLeaveSidenav}
      >
        <div className="scrollbar-inner">
          <div className="sidenav-header d-flex align-items-center">
            <a className="navbar-brand" href="/">
              <Logo
                src="../static/img/brand/theolex-logo.png"
                className="navbar-brand-img"
                alt="..."
              />
            </a>
            <div className="ml-auto">
              <div
                className={classnames("sidenav-toggler d-none d-xl-block", {
                  active: props.sidenavOpen
                })}
                data-action="sidenav-unpin"
                data-target="#sidenav-main"
                onClick={props.toggleSidenav}
              >
                <div className="sidenav-toggler-inner">
                  <i className="sidenav-toggler-line" />
                  <i className="sidenav-toggler-line" />
                  <i className="sidenav-toggler-line" />
                </div>
              </div>
            </div>
          </div>

          <div className="navbar-inner">
            <div
              className="collapse navbar-collapse"
              id="sidenav-collapse-main"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    href="#navbar-dpa"
                    role="button"
                    aria-expanded="true"
                    aria-controls="navbar-dpa"
                  >
                    <i className="ni ni-single-copy-04 text-pink" />
                    <span className="nav-link-text">DPA</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    href="#navbar-jurisprudence"
                    role="button"
                    aria-expanded="true"
                    aria-controls="navbar-jurisprudence"
                  >
                    <i className="ni ni-single-copy-04 text-blue" />
                    <span className="nav-link-text">Jurisprudences</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
