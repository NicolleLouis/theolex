import React, { useState, useEffect } from "react";
import getConfig from "next/config";
import axios from "axios";
import ResultsList from "./results/results-list";
import SearchButton from "./molecules/SearchButton";
import Filter from "./molecules/Filter";

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

/* Temporary option fillers */
const typeFilters = [
  { label: "DPA", value: "dpa" },
  { label: "OFAC", value: "OFAC" },
  { label: "Jurisprudence", value: "Jurisprudence" }
];

const genericFilters = [
  { label: "label1", value: "1" },
  { label: "label2", value: "2" },
  { label: "label3", value: "3" }
];

const Search = () => {
  const [results, setResults] = useState({ hits: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [filters, setFilters] = useState(new Object());

  const getQueryParams = () => {
    let params = {};
    params["filters"] = filters;
    if (searchTerm !== "") {
      params["input_search_bar"] = searchTerm;
    }
    return { params: params };
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsSearching(true);
      const queryParams = getQueryParams();

      try {
        const result = await axios.get(API_URL, queryParams);
        setResults(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsSearching(false);
    };
    fetchData();
  }, [triggerSearch]);


  useEffect(() => {
    // get filters object without type label of the filter
    let newFilters = {};
    // set type filter only if a value has been set
    if (typeFilter !== "") {
      newFilters["type"] = typeFilter;
    }

    setFilters(newFilters);
    setTriggerSearch(typeFilter);
  }, [typeFilter]);

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
                label="Type"
                className="col-4 col-md-2"
                options={typeFilters}
                value={typeFilter}
                onChange={setTypeFilter}
              />
              <Filter
                id="filter-generic"
                label="Generic"
                className="col-4 col-md-2"
                options={genericFilters}
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
