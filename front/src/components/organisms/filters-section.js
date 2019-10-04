import React from "react";
import Filter from "../molecules/filter";
import Card from "../atoms/card";
import DropdownSearch from "../molecules/dropdown-search";

const FiltersSection = ({ filters, setFilters }) => {
  return (
    <Card>
      <div className="form-group mb--4 mt--3">
        <div className="row">
          <Filter
            id="filter-justice-type"
            label="Juridiction"
            name="justice_type"
            className="col-4 col-md-2"
            value={filters.justice_type}
            filters={filters}
            setFilters={setFilters}
          />
          <DropdownSearch
            id="filter-type"
            label="Type"
            name="type"
            className="col-4 col-md-2"
            placeholder="Type..."
            value={filters.type}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      </div>
    </Card>
  );
};

export default FiltersSection;
