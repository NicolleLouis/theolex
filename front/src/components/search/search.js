import React, { useState } from "react";
import SearchTopnav from './search-topnav';
import SearchResults from './search-results';

const Search = () => {
  return (
    <>
      <SearchTopnav/>
      <SearchResults/>
    </>
  );
};

export default Search;
