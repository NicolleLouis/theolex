import React, { useState, useEffect } from "react";
import Searchbar from "../organisms/searchbar";
import FiltersSection from "../organisms/filters-section";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState("");
  useEffect(() => {
    console.log(searchTerm, " --- ", filters);
  }, [searchTerm, filters]);

  return (
    <>
      <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FiltersSection filters={filters} setFilters={setFilters} />
    </>
  );
};

export default SearchPage;
