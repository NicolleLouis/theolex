import React from "react";
import classnames from "classnames";

const SearchTopnav = (props) => {
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
                    <i className="sidenav-toggler-line"/>
                    <i className="sidenav-toggler-line"/>
                    <i className="sidenav-toggler-line"/>
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
                  <i className="ni ni-zoom-split-in"/>
                </a>
              </li>

            </ul>

          </div>
        </div>
      </nav>
    </>
  );
};

export default SearchTopnav;
