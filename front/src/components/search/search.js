import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./search-bar";
import SearchResults from "./search-results";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

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

      const config = {
        params: {
          input: query
        }
      };
      console.log("Query", config);
      try {
        const result = await axios.get(API_URL, config);
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
