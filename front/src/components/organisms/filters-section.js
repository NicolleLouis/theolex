import React from "react";
import Filter from "../molecules/filter";
import Card from "../atoms/card";

const FiltersSection = ({filters, setFilters}) => {

  return (
    <Card>
      <div className="form-group mb--5 mt--3">
        <div className="row">
          <Filter
            id="filter-type"
            label="type"
            className="col-4 col-md-2"
            value={filters.type}
            filters={filters}
            setFilters={setFilters}
          />
          <Filter
            id="filter-violation"
            label="violation"
            className="col-4 col-md-2"
            value={filters.violation}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      </div>
    </Card>
  );
};

export default FiltersSection;
