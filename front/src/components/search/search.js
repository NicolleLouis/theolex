import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./search-bar";
import SearchResults from "./search-results";

const API = "http://localhost:3000/api/dpas";

const Search = props => {
  const [data, setData] = useState({});
  const [query, setQuery] = useState("");
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
  }, [query]);
  return (
    <>
      <SearchBar isSidenavOpen={props.isSidenavOpen} query={query} setQuery={setQuery} />
      <SearchResults data={data} query={query} isError={isError} isLoading={isLoading} />
    </>
  );
};

export default Search;
