import React, { useEffect, useState } from "react";
import getConfig from "next/config";
import PropTypes from "prop-types";
import _ from "lodash";
import classnames from "classnames";
import Label from "../atoms/label";
import axios from "axios";
const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;
const GET_FILTERS_VALUE = API_URL + "/get_filter_values";

const Filter = ({ id, label, className, filters, setFilters, value }) => {
  const [fetchError, setFetchError] = useState(false);
  const [filterValues, setFilterValues] = useState([]);

  const getQueryParams = () => {
    let params = {};
    params["filter_label"] = label;
    return { params: params };
  };
  /* Get filters dropdown values */
  useEffect(() => {
    const fetchFilterValues = async () => {
      setFetchError(false);
      const queryParams = getQueryParams();

      try {
        const response = await axios.get(GET_FILTERS_VALUE, queryParams);
        const {
          data: { values }
        } = response;

        setFilterValues(values);
      } catch (error) {
        setFetchError(true);
        console.error("Fetch filter ", label, "error: ", error);
      }
    };
    fetchFilterValues();
  }, [label]);

  const handleChange = event => {
    event.persist();
    if (event.target.value !== "") {
      setFilters(filters => ({
        ...filters,
        [event.target.name]: event.target.value
      }));
    } else {
      delete filters[event.target.name];
      setFilters(Object.assign({}, filters));
    }
  };

  return (
    <div className={className}>
      <div className="form-group">
        <Label htmlFor={id}>{_.capitalize(label)}</Label>
        <select
          id={id}
          className={classnames("form-control", {
            "is-invalid": fetchError
          })}
          name={label}
          onChange={handleChange}
          value={value}
          style={{ cursor: "pointer" }}
        >
          <option key="-1" value="">
            ---
          </option>
          {filterValues &&
            filterValues.length > 0 &&
            filterValues.map((filter, index) => {
              return (
                <option key={index} value={filter}>
                  {filter}
                </option>
              );
            })}
        </select>
        {fetchError && (
          <div className="invalid-feedback">Can't get {label} values</div>
        )}
      </div>
    </div>
  );
};

Filter.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
};

export default Filter;
