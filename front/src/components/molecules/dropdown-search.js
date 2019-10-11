import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import getConfig from "next/config";
import PropTypes from "prop-types";
import classnames from "classnames";
import Label from "../atoms/label";
import axios from "axios";
const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;
const GET_FILTERS_VALUE = API_URL + "/get_filter_values";

const DropdownSearch = ({
  id,
  name,
  label,
  className,
  placeholder,
  filters,
  setFilters,
  value
}) => {
  const [fetchError, setFetchError] = useState(false);
  const [filterValues, setFilterValues] = useState([]);
  const [localValue, setLocalValue] = useState(value ? value : "");

  const getQueryParams = name => {
    let params = {};
    params["filter_label"] = name;
    return { params: params };
  };

  /* Get filters dropdown values */
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const fetchFilterValues = async () => {
      setFetchError(false);
      const queryParams = Object.assign(
        { cancelToken: source.token },
        getQueryParams(name)
      );

      try {
        const response = await axios.get(GET_FILTERS_VALUE, queryParams);
        const {
          data: { values }
        } = response;

        setFilterValues(values);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.info("fetchFilterValues cancelled", error);
        } else {
          setFetchError(true);
          console.error(`fetchFilterValues error ${name} ${error}`);
          throw error;
        }
      }
    };
    console.info(`fetchFilterValues fetching ${name} ${value}`);
    fetchFilterValues();
    return () => {
      source.cancel();
    };
  }, [name]);

  const triggerFilters = debounce((localValue, name) => {
    console.info(
      `triggerFilters ${JSON.stringify(
        filters,
        null,
        2
      )} localValue ${localValue}`
    );
    if (localValue !== "") {
      setFilters(filters => ({
        ...filters,
        [name]: localValue
      }));
    } else {
      delete filters[name];
      setFilters(Object.assign({}, filters));
    }
  }, 100);

  const handleChange = event => {
    event.persist();
    setLocalValue(event.target.value);
    triggerFilters(localValue, name);
  };

  const handleKeyUp = event => {
    console.info(`HandleKeyUp ${JSON.stringify(filters, null, 2)}`);
    event.persist();
    triggerFilters(localValue, name);
  };

  return (
    <div className={className}>
      <div className="form-group">
        <Label htmlFor={id}>{label}</Label>
        <input
          id={id}
          className={classnames("form-control", {
            "is-invalid": fetchError
          })}
          list={`${id}-list`}
          name={name}
          type="text"
          placeholder={placeholder}
          value={localValue}
          style={{ cursor: "pointer" }}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
        <datalist id={`${id}-list`} className="lisbox">
          {filterValues &&
            filterValues.length > 0 &&
            filterValues.map((option, index) => {
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              );
            })}
        </datalist>
        {fetchError && (
          <div className="invalid-feedback">Can't get {label} values</div>
        )}
      </div>
    </div>
  );
};

DropdownSearch.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
};

export default DropdownSearch;
