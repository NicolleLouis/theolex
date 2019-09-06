import React, { useState, useEffect } from "react";
import Searchbar from "../organisms/searchbar";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log(searchTerm);
  }, [searchTerm]);

  return (
    <>
      <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </>
  );
};

export default SearchPage;
