import React from "react";
import Filter from "../molecules/filter";
import Card from "../atoms/card";

const FiltersSection = ({filters, setFilters}) => {

  return (
    <Card>
      <div className="form-group mb--4 mt--3">
        <div className="row">
          <Filter
            id="filter-justice-type"
            label="Justice type"
            name="justice_type"
            className="col-4 col-md-2"
            value={filters.justice_type}
            filters={filters}
            setFilters={setFilters}
          />
          <Filter
            id="filter-type"
            label="Type"
            name="type"
            className="col-4 col-md-2"
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
