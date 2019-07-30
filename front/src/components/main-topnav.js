import React from "react";
import classnames from "classnames";

const MainTopnav = (props) => {
  // function that on mobile devices makes the search open
  const openSearch = () => {
    document.body.classList.add("g-navbar-search-showing");
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-showing");
      document.body.classList.add("g-navbar-search-show");
    }, 150);
    setTimeout(function() {
      document.body.classList.add("g-navbar-search-shown");
    }, 300);
  };
  // function that on mobile devices makes the search close
  const closeSearch = () => {
    document.body.classList.remove("g-navbar-search-shown");
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-show");
      document.body.classList.add("g-navbar-search-hiding");
    }, 150);
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-hiding");
      document.body.classList.add("g-navbar-search-hidden");
    }, 300);
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-hidden");
    }, 500);
  };
  return (
    <>
      <nav className=
        "navbar-top navbar-expand border-bottom navbar-light bg-secondary"
      >
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form
              className="navbar-search form-inline mr-sm-3 navbar-search-light" id="navbar-search-main"
            >
              <div className="form-group mb-0">
                <div className="input-group input-group-alternative input-group-merge">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-search" />
                    </span>
                  </div>
                  <input
                    className="form-control"
                    placeholder="Search"
                    type="text"
                  />
                </div>
              </div>
              <button
                type="button"
                className="close"
                data-action="search-close"
                data-target="#navbar-search-main"
                aria-label="Close"
                onClick={closeSearch}
              >
                <span aria-hidden="true">×</span>
              </button>
            </form>

            <ul className="navbar-nav align-items-center ml-md-auto">
              <li className="nav-item d-xl-none">
                <div
                  className={classnames(
                    "pr-3 sidenav-toggler",
                    { active: props.sidenavOpen }
                  )}
                  data-action="sidenav-pin"
                  data-target="#sidenav-main"
                  onClick={props.toggleSidenav}
                >
                  <div className="sidenav-toggler-inner">
                    <i className="sidenav-toggler-line"></i>
                    <i className="sidenav-toggler-line"></i>
                    <i className="sidenav-toggler-line"></i>
                  </div>
                </div>
              </li>
              <li className="nav-item d-sm-none">
                <a
                  className="nav-link"
                  href="#"
                  data-action="search-show"
                  data-target="#navbar-search-main"
                  onClick={openSearch}
                >
                  <i className="ni ni-zoom-split-in"></i>
                </a>
              </li>

              {/*
              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="ni ni-ungroup" />
                </a>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-dark bg-default dropdown-menu-right">
                  <div className="row shortcuts px-4">
                    <a href="#!" className="col-4 shortcut-item">
                      <span className="shortcut-media avatar rounded-circle bg-gradient-red">
                        <i className="ni ni-calendar-grid-58" />
                      </span>
                      <small>Calendar</small>
                    </a>
                    <a href="#!" className="col-4 shortcut-item">
                      <span className="shortcut-media avatar rounded-circle bg-gradient-orange">
                        <i className="ni ni-email-83" />
                      </span>
                      <small>Email</small>
                    </a>
                    <a href="#!" className="col-4 shortcut-item">
                      <span className="shortcut-media avatar rounded-circle bg-gradient-info">
                        <i className="ni ni-credit-card" />
                      </span>
                      <small>Payments</small>
                    </a>
                    <a href="#!" className="col-4 shortcut-item">
                      <span className="shortcut-media avatar rounded-circle bg-gradient-green">
                        <i className="ni ni-books" />
                      </span>
                      <small>Reports</small>
                    </a>
                  </div>
                </div>
              </li>
              */}
            </ul>

            {/*
            <ul className="navbar-nav align-items-center ml-auto ml-md-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link pr-0"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="media align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="Image placeholder"
                        src="../static/img/theme/team-4.jpg"
                      />
                    </span>
                    <div className="media-body ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm  font-weight-bold">
                        John Snow
                      </span>
                    </div>
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <div className="dropdown-header noti-title">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </div>
                  <a href="#!" className="dropdown-item">
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </a>
                  <a href="#!" className="dropdown-item">
                    <i className="ni ni-settings-gear-65" />
                    <span>Settings</span>
                  </a>
                  <a href="#!" className="dropdown-item">
                    <i className="ni ni-calendar-grid-58" />
                    <span>Activity</span>
                  </a>
                  <a href="#!" className="dropdown-item">
                    <i className="ni ni-support-16" />
                    <span>Support</span>
                  </a>
                  <div className="dropdown-divider" />
                  <a href="#!" className="dropdown-item">
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </a>
                </div>
              </li>
            </ul>
            */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default MainTopnav;
