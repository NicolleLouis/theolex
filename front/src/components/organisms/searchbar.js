import React from "react";

const Searchbar = ({ searchTerm, setSearchTerm, triggerSearch }) => {
  const handleChange = event => setSearchTerm(event.target.value);

  return (
    <nav className="navbar navbar-top navbar-expand-md border-bottom navbar-search navbar-search-light bg-secondary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse">
          <div className="form-group mb-0">
            <div className="input-group input-group-alternative">
              <div className="input-group-prepend">
                <button
                  type="button"
                  className="input-group-text bg-gradient-blue"
                  onClick={triggerSearch}
                >
                  <i className="fas fa-search" />
                </button>
              </div>
              <input
                className="form-control"
                placeholder="Search"
                type="text"
                value={searchTerm}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Searchbar;
