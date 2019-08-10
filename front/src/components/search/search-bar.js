import React from "react";
import classnames from "classnames";

const SearchBar = props => {

  return (
    <>
      <nav className="navbar navbar-top navbar-expand-md border-bottom navbar-search-light bg-secondary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form
              className="navbar-search form-inline mr-sm-3 navbar-search-light"
              id="navbar-search-main"
            >
              <div className="form-group mb-0">
                <div className="input-group input-group-alternative">
                  <div className="input-group-prepend">
                    <button className="input-group-text bg-gradient-blue" onClick={() => props.setSearch(props.query)}>
                      <i className="fas fa-search" />
                    </button>
                  </div>
                  <input
                    className="form-control"
                    placeholder="Search"
                    type="text"
                    onChange={event => props.setQuery(event.target.value)}
                  />
                </div>
              </div>
            </form>

            <ul className="navbar-nav align-items-center ml-md-auto">
              <li className="nav-item d-xl-none">
                <div
                  className={classnames("pr-3 sidenav-toggler", {
                    active: props.isSidenavOpen
                  })}
                  data-action="sidenav-pin"
                  data-target="#sidenav-main"
                  onClick={props.toggleSidenav}
                >
                  <div className="sidenav-toggler-inner">
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SearchBar;
