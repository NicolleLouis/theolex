import React, { useState, useEffect } from "react";
import getConfig from "next/config";
import axios from "axios";
import ResultsList from "./results/results-list";
import Label from "./atoms/label";
import SearchButton from "./molecules/SearchButton";

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

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
    setTypeFilter("");
  }, []);

  useEffect(() => {
    // Il y a un problème ici: tu as hard code le filter name alors qu'il devrait être dépendant du label du filtre
    // Il ne faut pas utiliser un array de dict mais un dict tout court, on avait du mal se comprendre au téléphone

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
            <div className="form-group col-4 col-md-2">
              <Label htmlFor="typeFilter">Type</Label>
              <select
                id="typeFilter"
                className="form-control"
                onChange={event => setTypeFilter(event.target.value)}
                value={typeFilter}
              >
                <option value=""> --- </option>
                <option value="dpa">DPA</option>
                <option value="jurisprudence">Jurisprudence</option>
              </select>
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
