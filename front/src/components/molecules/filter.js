import React from "react";
import PropTypes from "prop-types";
import Label from "../atoms/label";

const Filter = ({ id, label, options, className, onChange, value }) => {
  const handleChange = e => {
    onChange(e.target.value);
    e.preventDefault();
  };

  return (
    <div className={className}>
      <div className="form-group">
        <Label htmlFor={id}>{label}</Label>
        <select
          id={id}
          className="form-control"
          onChange={handleChange}
          value={value}
        >
          <option key="-1" value="">---</option>
          {options.length > 0 &&
            options.map((filter, index) => {
              return (
                <option key={index} value={filter.value}>
                  {filter.value}
                </option>
              );
            })}
        </select>
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
