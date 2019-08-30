import React, { useState, useEffect } from "react";
import getConfig from "next/config";
import axios from "axios";
import ResultsList from "./results/results-list";
import SearchButton from "./atoms/search-button";
import Filter from "./molecules/filter";

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;
const GET_DECISIONS = API_URL + "/get_decisions";

const Search = () => {
  const [results, setResults] = useState({ hits: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [violationFilter, setViolationFilter] = useState("");
  const [filters, setFilters] = useState(new Object());

  const getQueryParams = () => {
    let params = {};
    params["filters"] = filters;
    if (searchTerm !== "") {
      params["input_search_bar"] = searchTerm;
    }
    return { params: params };
  };

  /* Call search request*/
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

  /* Update filters */
  useEffect(() => {
    // get filters object without type label of the filter
    let newFilters = {};
    // set type filter only if a value has been set
    if (typeFilter !== "") {
      newFilters["type"] = typeFilter;
    }
    if (violationFilter !== "") {
      newFilters["violation"] = violationFilter;
    }
    setFilters(newFilters);
    setTriggerSearch(newFilters);
  }, [typeFilter, violationFilter]);

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
      <div className="card">
        <div className="card-body">
          <form>
            <div className="row">
              <Filter
                id="filter-type"
                label="type"
                className="col-4 col-md-2"
                value={typeFilter}
                onChange={setTypeFilter}
              />
              <Filter
                id="filter-violation"
                label="violation"
                className="col-4 col-md-2"
                value={violationFilter}
                onChange={setViolationFilter}
              />
            </div>
          </form>
        </div>
      </div>

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
              <ResultsList data={results} />
            </>
          )
        )}
      </div>
    </>
  );
};

export default Search;
