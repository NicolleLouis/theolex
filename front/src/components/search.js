import React, { useState, useEffect } from "react";
import getConfig from "next/config";
import axios from "axios";
import ResultsList from "./results/results-list";

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

const Search = () => {
  const [results, setResults] = useState({ hits: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsSearching(true);

      const config = {
        params: {
          input: searchTerm
        }
      };
      try {
        const result = await axios.get(API_URL, config);
        setResults(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsSearching(false);
    };
    fetchData();
  }, [triggerSearch]);

  const handleSubmit = event => {
    setTriggerSearch(searchTerm);
    event.preventDefault();
  };

  return (
    <>
      <nav className="navbar navbar-top navbar-expand-md border-bottom navbar-search-light bg-secondary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form
              className="navbar-search form-inline mr-sm-3 navbar-search-light"
              id="navbar-search-main" onSubmit={handleSubmit}
            >
              <div className="form-group mb-0">
                <div className="input-group input-group-alternative">
                  <div className="input-group-prepend">
                    <button type= "submit" className="input-group-text bg-gradient-blue">
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
