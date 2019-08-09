import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./search-bar";
import SearchResults from "./search-results";

const API = "http://localhost:8000/api/get_all_results";

const Search = props => {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(API);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [search]);
  return (
    <>
      <SearchBar
        isSidenavOpen={props.isSidenavOpen}
        query={query}
        setQuery={setQuery}
        setSearch={setSearch}
      />
      <SearchResults
        data={data}
        query={query}
        isError={isError}
        isLoading={isLoading}
      />
    </>
  );
};

export default Search;
