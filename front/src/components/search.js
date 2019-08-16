import React, { useState, useEffect } from "react";
import useDebounce from "../hooks/use-debounce";
import getConfig from "next/config";
import classnames from "classnames";
import ResultsList from "./results/results-list";

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

const Search = props => {
  const [results, setResults] = useState({ hits: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isError, setIsError] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  function searchCharacters(search) {
    return fetch(`${API_URL}?input=${search}`, {
      method: "GET"
    }).then(r => r.json());
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      searchCharacters(debouncedSearchTerm).then(results => {
        setIsSearching(false);
        if (results) {
          setResults(results);
        } else {
          setIsError(true)
        }
      });
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);
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
                    <button className="input-group-text bg-gradient-blue">
                      <i className="fas fa-search" />
                    </button>
                  </div>
                  <input
                    className="form-control"
                    placeholder="Search"
                    type="text"
                    onChange={event => setSearchTerm(event.target.value)}
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

      <div className="ml-4">
        {isError && <div>Something went wrong ...</div>}
        {isSearching ? (
          <div>Searching ...</div>
        ) : (
          results &&
          results.hits && (
            <>
              <div>{results.hits.length} résultats</div>
              <br />
              <ResultsList data={results} />
            </>
          )
        )}
      </div>
    </>
  );
};

export default Search;
