import React, { useState, useEffect } from "react";
import getConfig from "next/config";
import axios from "axios";
import ResultList from "./results/result-list";
import SearchButton from "./atoms/search-button";
import FiltersSection from "./organisms/filters-section";

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;
const GET_DECISIONS = API_URL + "/get_decisions";

const Search = () => {
  const [results, setResults] = useState({ hits: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState("");
  const [filters, setFilters] = useState({});

  const getQueryParams = () => {
    let params = {};
    params["filters"] = filters;
    if (searchTerm !== "") {
      params["input_search_bar"] = searchTerm;
    }
    return { params: params };
  };

  /* Call API when search is triggered */
  useEffect(() => {
    const fetchDecisions = async () => {
      setIsError(false);
      setIsSearching(true);
      const queryParams = getQueryParams();

      try {
        const response = await axios.get(GET_DECISIONS, queryParams);
        setResults(response.data);
      } catch (error) {
        setIsError(true);
      }
      setIsSearching(false);
    };
    fetchDecisions();
  }, [triggerSearch]);

  /* Trigger search with filters */
  useEffect(() => {
    setTriggerSearch(filters);
  }, [filters]);

  const handleSubmit = event => {
    setTriggerSearch(searchTerm);
    event.preventDefault();
  };

  return (
    <>
      <nav className="navbar navbar-top navbar-expand-md border-bottom navbar-search-light bg-secondary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <form
              className="navbar-search form-inline mr-sm-3 navbar-search-light"
              id="navbar-search-main"
              onSubmit={handleSubmit}
            >
              <div className="form-group mb-0">
                <div className="input-group input-group-alternative">
                  <div className="input-group-prepend">
                    <SearchButton />
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

      <FiltersSection filters={filters} setFilters={setFilters} />

      <div className="ml-4">
        {isError && <div>Something went wrong ...</div>}
        {isSearching ? (
          <div>Searching ...</div>
        ) : (
          results &&
          results.hits && (
            <>
              <div>{results.hits.length} result(s)</div>
              <br />
              <ResultList data={results} />
            </>
          )
        )}
      </div>
    </>
  );
};

export default Search;
