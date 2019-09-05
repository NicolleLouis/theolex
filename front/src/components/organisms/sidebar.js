import React from "react";
import styles from "styled-components";
import classnames from "classnames";
import NavSidebarItem from "../atoms/nav-sidebar-item";

const Logo = styles.img`
  max-height: 5rem !important;
`;

const Sidebar = ({
  sidebarContext,
  sidenavTab,
  setSidenavTab,
  isSidenavOpen,
  toggleSidenav
}) => {
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
                  active: isSidenavOpen
                })}
                data-action="sidenav-unpin"
                data-target="#sidenav-main"
                onClick={toggleSidenav}
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
            <div className="nav-wrapper">
              <ul className="navbar-nav">
                {sidebarContext &&
                  sidebarContext.map(navItem => {
                    return (
                      <NavSidebarItem
                        key={navItem.index}
                        item={navItem}
                        sidenavTab={sidenavTab}
                        setSidenavTab={setSidenavTab}
                      />
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
